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

        sort_option = params[:sort]

        if sort_option == 'priceDesc'
            sort_param = :price
            sort_order = 'desc'
        elsif sort_option == 'priceAsc'
            sort_param = :price
            sort_order = 'asc'
        else
            sort_param = :id
        end

        if sort_order == 'asc' &&  sort_param == :price
            print 'first condition'
            @categories = Category.paginate(:page => params[:page]).includes(:listing).where(category: params[:id]).order('listings.price')
        elsif sort_order == 'desc' &&  sort_param == :price
            print 'second condition'
            @categories = Category.paginate(:page => params[:page]).includes(:listing).where(category: params[:id]).order('listings.price DESC')
        else
            print 'third condition'
            @categories = Category.paginate(:page => params[:page]).includes(:listing).where(category: params[:id]).order('listings.id')
        end

        @listings = @categories.map do |category| 
            category.listing
        end


        @listings = @listings.compact
        # debugger
        # @listings.push(:total_pages => @categories.total_pages)
        # @listings.push(:current_page => @categories.current_page)


        @total = [@categories, @listings]

        render '/api/listings/index'
        # render :index 
    end



    private
    def category_params
        params.require(:category).permit(:category, :listing_id)
    end

    def sort_params
        params.require(:sort).permit(:sort_option)
    end
end