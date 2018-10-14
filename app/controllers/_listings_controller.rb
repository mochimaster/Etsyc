class ListingsController < ApplicationController

  def new
    @listing = Listing.new
    render :new
  end

  def create
    @listing = Listing.new(listing_params)
    @listing.author_id = current_user.id

    if @listing.save
      redirect_to listing_url(@listing)
    else
      render json: @listing.errors.full_messages, stats: 422
    end
  end

  def show

    @listing = Listing.find(params[:id])
    if @listing
      render :show
    else
      render json: @listing.errors.full_messages, status: 404
    end
  end

  # def index
  #   fail
  #   @listings = if params[:user_id]
  #                 Listing.where(author_id: params[:user_id])
  #               else
  #                 Listing.all
  #               end
  #
  #   render :index
  # end

  def edit
    @listing = Listing.find(params[:id])
    render :edit
  end

  def update
    @listing = Listing.find(params[:id])

    if @listing.update(listing_params)
      redirect_to listing_url(@listing)
    else
      render json: @listing.errors.full_messages, status: 422
    end
  end

  def destory
    @listing = Listing.find(params[:id])

    if @listing.destory
      redirect_to listings_url
    else
      render plain: "You don't have permission to delete that."
    end

  end

  def listing_params
    params.require(:listing).permit(:title, :description, :author_id,
                              :modified_by_userid)

  end

end
