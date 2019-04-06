class Api::ListingsController < ApplicationController

  def create
    # debugger
    @listing = Listing.new(listing_params)

    # <ActionController::Parameters {"listing"=>{"title"=>"fancy lamp", "overview"=>"44", "price"=>"66", "description"=>"55", "author_id"=>"1", "merchant_name"=>"Atsy", "photos"=>[#<ActionDispatch::Http::UploadedFile:0x007ff2e2302e10 @tempfile=#<Tempfile:/var/folders/8v/v0k661gs061c87pgjflrfnmw0000gn/T/RackMultipart20181118-4250-qqd8zm.jpg>, @original_filename="1.jpg", @content_type="image/jpeg", @headers="Content-Disposition: form-data; name=\"listing[photos][]\"; filename=\"1.jpg\"\r\nContent-Type: image/jpeg\r\n">]}, "format"=>:json, "controller"=>"api/listings", "action"=>"create"} permitted: false>
    @listing.modified_by_userid = @listing.author_id
    # debugger
    if @listing.save
      render :show
    else
      render json: @listing.errors.full_messages, status: 401
    end
  end

  def update
    @listing = Listing.find_by(id: params[:id])

    if @listing && @listing.update_attributes(listing_params)
      render :show
    elsif !@listing
      render json: ['Listing cannot be found.'], status: 400
    else
      render json: @listing.errors.full_messages, status: 401
    end
  end

  def show
    @listing = Listing.with_attached_photos.find_by(id: params[:id])
    if @listing
      render :show
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

    @listings = Listing.paginate(:page => params[:page]).includes(:author).with_attached_photo.with_attached_photos
    # @listings = Listing.paginate(:page => params[:page])

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


  private
  def listing_params
    # params[:listing][:modified_by_userid] = params[:author_id]

    params.require(:listing).permit(:title, :description, :author_id,
      :modified_by_userid, :price, :overview, :photo, :merchant_name, :page, photos: [] )

    # params.require(:listing).permit(:title, :description, :author_id,
    #   :modified_by_userid, :price, :overview, photos: [], :merchant_name)
  end
end
