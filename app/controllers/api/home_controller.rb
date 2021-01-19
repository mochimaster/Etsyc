class Api::HomeController < ApplicationController
    def index
       @user_listings = User.find(params[:user_id]).listings.where(status: [false]).paginate(:page => params[:page])
    end


end