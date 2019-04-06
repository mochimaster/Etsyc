class Api::SearchController < ApplicationController

    def index
        @listings = Listing.search_result(search_params[:title])
        debugger
        render 'api/listings/index'
    end

    def search_params
        params.require(:search).permit(:title)
    end

end