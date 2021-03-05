class Api::CartsController < ApplicationController

  def create
    # debugger
    @cart = Cart.new(cart_params)

    if @cart.save
      # render json: ["successful added to cart."] ,status: 204
      render :show
    else
      render @cart.errors.full_messages, status: 401
    end
  end

  def update
    # debugger
    @cart = Cart.find_by(id: params[:id])

    if @cart && @cart.update_attributes(cart_params)
      # render json: ["Successfully updated cart."], status: 204
      render :show
    elsif !@cart
      render json: ['Cart cannot be found.'], status: 400
    else
      render @cart.errors.full_messages, status: 401
    end
  end

  def index
    @carts = Cart.where(user_id: params[:user_id]).includes(:listing).where(listings: { status: true }).order('renewed_at DESC')

    render :index
  end

  def destroy
    @cart = Cart.find_by(id: params[:id])

    if @cart
      @cart.destroy

    else
      render ['Cart cannot be destroyed.']
    end

  end

  def show
    @cart = Cart.find_by(id: params[:id])
    if @cart
      render :show
    end
  end



  private
  def cart_params
      # debugger
      params.require(:cart).permit(:quantity, :listing_id, :user_id)
  end


end
