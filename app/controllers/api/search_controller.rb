class Api::SearchController < ApplicationController

    def index
        # debugger
        if params[:page] == "NaN"
            params[:page]=1
        end

        @listings = Listing.includes(:author).with_attached_photo.with_attached_photos.search_result(search_params[:title]).paginate(:page => params[:page])

        # @listings = Listing.search_result(search_params[:title])

        render 'api/listings/index'
    end

    def search_params
        debugger
        params.require(:search).permit(:title)
    end

end