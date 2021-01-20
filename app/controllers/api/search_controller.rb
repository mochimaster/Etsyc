class Api::SearchController < ApplicationController

    def index
        if params[:page] == "NaN"
            params[:page]=1
        end

        status = search_params[:isDisabled] == "true" ? false : [nil, true]

        @listings = Listing.where(status: status).includes(:author).with_attached_photo.with_attached_photos.search_result(search_params[:title]).paginate(:page => params[:page])

        render 'api/listings/index'
    end

    def search_params
        params.require(:search).permit(:title, :isDisabled)
    end

end