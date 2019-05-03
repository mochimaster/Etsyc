class Api::CategoriesController < ApplicationController

    def create
        @category = Category.new(category_params)

        if @category.save
            render 'api/listings/index'
        else
            render json: @category.errors.full_messages, status: 401
        end
    end

    def update
        @category = Review.where(listing_id: params[:listing_id])

        if @category && @category.update_attributes(category_params)
            render 'api/listings/show'
        elsif !@category
            render json: ['Category cannot be found'], status: 400
        else
            render json: @category.errors.full_messages, status: 401
        end

    end

    def index
        @categories = if params[:id]
                        Category.where(category: params[:id])
                    else
                        Category.all
                    end
        render :index
    end 

    def show

        if params[:page] == "NaN"
        params[:page]=1
        end

        @categories = Category.paginate(:page => params[:page]).includes(:listing).where(category: params[:id])

        @listings = @categories.map do |category| 
            category.listing
        end
        @listings = @listings.compact
        debugger
        render '/api/listings/index'
        # render :index 
    end



    private
    def category_params
        params.require(:category).permit(:category, :listing_id)
    end

end