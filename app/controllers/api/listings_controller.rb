class Api::ListingsController < ApplicationController

  def create
    @listing = Listing.new(listing_params)

    # <ActionController::Parameters {"listing"=>{"title"=>"fancy lamp", "overview"=>"44", "price"=>"66", "description"=>"55", "author_id"=>"1", "merchant_name"=>"Atsy", "photos"=>[#<ActionDispatch::Http::UploadedFile:0x007ff2e2302e10 @tempfile=#<Tempfile:/var/folders/8v/v0k661gs061c87pgjflrfnmw0000gn/T/RackMultipart20181118-4250-qqd8zm.jpg>, @original_filename="1.jpg", @content_type="image/jpeg", @headers="Content-Disposition: form-data; name=\"listing[photos][]\"; filename=\"1.jpg\"\r\nContent-Type: image/jpeg\r\n">]}, "format"=>:json, "controller"=>"api/listings", "action"=>"create"} permitted: false>
    @listing.modified_by_userid = @listing.author_id
    @listing.renewed_at = DateTime.now

    if @listing.save
      render :show
    else
      render json: @listing.errors.full_messages, status: 401
    end
  end

  def update
    @listing = Listing.find_by(id: params[:id])
    
    photo_hash = listing_params[:photo_hash]
    params[:listing].delete :photo_hash
    
    user_params= {} if !user_params

    if @listing && @listing.update_attributes(listing_params) && @listing.author.update_attributes(user_params)
      if photo_hash
        photo_hash.each_with_index { |truth, index|
        if truth == "false"
          @listing.photos[index].purge
        end
      }
      end

      render :show
    elsif !@listing
      render json: ['Listing cannot be found.'], status: 400
    else
      render json: @listing.errors.full_messages, status: 401
    end
  end

  def show
    @listing = Listing.includes(:categories).with_attached_photos.find_by(id: params[:id])

    if !@listing.status && @listing.author_id != params[:userId].to_i
      render json: ['Listing cannot be found.'], status: 404
    elsif @listing
      @listing.is_requested_by_author = true if @listing.author_id == params[:userId].to_i
      render :show
    elsif !@listing
      render json: ['Listing cannot be found.'], status: 404
    end
  end

  def index
    # @listings = if params[:user_id]
    #               # Listing.where(author_id: params[:user_id])
    #             else
    #               # debugger
    #               # Listing.all.limit(10)
    #               Listing.all.includes(:author).with_attached_photos.with_attached_photo
    #             end
    # @listings = Listing.all.includes(:author).with_attached_photos.with_attached_photo.paginate(:page => params[:page])
    # @listings = Listing.all.includes(:author).with_attached_photos.with_attached_photo.paginate(:page => params[:page])     
    if params[:page] == "NaN"
      params[:page]=1
    end

    ids = params[:ids]

    filters = params[:filters]

    condition = filters[:condition] == 'all' ? ['new', 'used', 'like new'] : filters[:condition]

    sort_option = params[:sort]

    if sort_option == 'priceDesc'
      sort_param = :price
      sort_order = 'desc'
    elsif sort_option == 'priceAsc'
      sort_param = :price
      sort_order = 'asc'
    else
      sort_param = :id
    end

    if ids && ids.length > 0
      @listings = Listing.where(id: ids,status: [nil, true], condition: condition).order(sort_param).paginate(:page => params[:page]).includes(:author).with_attached_photo.with_attached_photos
    elsif sort_order == 'asc' && sort_param == :price
      @listings = Listing.where(status: [nil, true], condition: condition).order(sort_param).paginate(:page => params[:page]).includes(:author).with_attached_photo.with_attached_photos
    elsif sort_order == 'desc' && sort_param == :price
      @listings = Listing.where(status: [nil, true], condition: condition).order(sort_param).reverse_order.paginate(:page => params[:page]).includes(:author).with_attached_photo.with_attached_photos
    else
      @listings = Listing.where(status: [nil, true], condition: condition).order('renewed_at DESC').paginate(:page => params[:page]).includes(:author).with_attached_photo.with_attached_photos
    end
    
    render :index    
    # render json: {
    #   listings: @listings,
    #   page: @listings.current_page,
    #   pages: @listings.total_pages
    # }
  end

  def destroy
    @listing = Listing.find_by(id: params[:id])
    if @listing
      @listing.destroy
      render :show
    else
      render ['Cannot delete that listing.']
    end
  end

  def renew
    @listing = Listing.find_by(id: params[:listing_id])

    @listing.renewed_at = DateTime.now

    if @listing.save
      render :show
    else
      render json: @listing.errors.full_messages, status: 401
    end
  end

  private
  def listing_params
    # params[:listing][:modified_by_userid] = params[:author_id]
    params.require(:listing).permit(:title, :description, :author_id,
      :modified_by_userid, :price, :overview, :photo, :merchant_name, :page, 
      :category, :status, :brand,:condition, :internal_note, photo_hash:[], photos: [])

    # params.require(:listing).permit(:title, :description, :author_id,
    #   :modified_by_userid, :price, :overview, photos: [], :merchant_name)
  end
  
  def user_params
    params.require(:user).permit(:phone_number)
  end

  def sort_params
    params.require(:sort).permit(:sort_option)
  end


end
