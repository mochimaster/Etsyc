class Api::ReviewController < ApplicationController

  def create
    @review = Review.new(review_params)

    if @review.save
      render :show
    else
      render json: @review.errors.full_messages, status: 401
    end
  end

  def update
    @review = Review.find_by(id: params[:id])

    if @review && @review.update_attributes(review_params)
      render :show
    elsif !@review
      render json: ['Review cannot be found.'], status: 400
    else
      render json: @review.errors.full_messages, status: 401
    end
  end

  def show
    @review = Review.find_by(id: params[:id])
    if @review
      render :show
    end
  end

  def index
    @reviews = if params[:user_id]
                Review.where(:user_id: params[:user_id])
              else
                Review.all
              end
    render :index
  end

  def destroy

    @review = Review.find_by(id: params[:id])
    if @review
      @review.destroy
      render :show
    else
      render ['Cannot delete that review.']
    end
  end


  private
  def review_params
    params.require(:review).permit(:body, :rating)
  end



end
