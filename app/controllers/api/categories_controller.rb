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

        filters = params[:filters]
        condition = filters && filters[:condition]
        
        if !condition || condition == 'all'
            condition = ['new', 'used']
        end



        if sort_order == 'asc' &&  sort_param == :price
            @categories = Category.includes(:listing).where(listings: { status: [nil, true], condition: condition }).paginate(:page => params[:page]).where(category: params[:id]).order('listings.price')
        elsif sort_order == 'desc' &&  sort_param == :price
            @categories = Category.includes(:listing).where(listings: { status: [nil, true], condition: condition }).paginate(:page => params[:page]).where(category: params[:id]).order('listings.price DESC')
        else
            @categories = Category.includes(:listing).where(listings: { status: [nil, true], condition: condition }).paginate(:page => params[:page]).where(category: params[:id]).order('renewed_at DESC')
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