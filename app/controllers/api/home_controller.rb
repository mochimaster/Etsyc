class Api::HomeController < ApplicationController
    def index
        @user_listings = User.find(params[:user_id]).listings.where(status: [false]).order('renewed_at DESC').with_attached_photo.with_attached_photos.search_result(params[:search]).paginate(:page => params[:page])
    end


end