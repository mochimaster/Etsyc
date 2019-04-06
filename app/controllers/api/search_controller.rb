class Api::SearchController < ApplicationController

    def index
        @listings = Listing.includes(:author).with_attached_photo.with_attached_photos.search_result(search_params[:title])
        # @listings = Listing.search_result(search_params[:title])
        
        render 'api/listings/index'
    end

    def search_params
        params.require(:search).permit(:title)
    end

end