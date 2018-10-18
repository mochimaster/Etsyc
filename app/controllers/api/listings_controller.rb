class Api::ListingsController < ApplicationController

  def create
    debugger
    @listing = Listing.new(listing_params)


    @listing.modified_by_userid = @listing.author_id
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
    # debugger
    @listing = Listing.find_by(id: params[:id])
    if @listing
      render :show
    end
  end

  def index
    # debugger
    # @listings = if params[:listingIds]
    #               Listing.where(id: params[:listingIds])
    #             elsif params[:user_id]
    #               Listing.where(author_id: params[:user_id])
    #             elsif
    #               Listing.all
    #             end
    @listings = if params[:user_id]
                  Listing.where(author_id: params[:user_id])
                else
                  Listing.all
                end

    render :index
  end

    # def index
    #   @listings = Lisintg.all
    # end

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
    # debugger
    # params[:listing][:modified_by_userid] = params[:author_id]
    # debugger
    params.require(:listing).permit(:title, :description, :author_id,
      :modified_by_userid, :price, :overview, :photo, :merchant_name )
  end





end
