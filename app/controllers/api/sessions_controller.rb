class Api::SessionsController < ApplicationController
  # def new
  # end

  def create

    @user = User.find_by_credentials(
      params[:user][:username],
      params[:user][:password]
    )

    if @user
      # debugger
      sign_in(@user)
      render "/api/users/show"
    else
      # debugger
      render json: ["Invalid username/password combination."], status: 401
    end
  end

  def destroy
    @user = current_user

    if @user
      sign_out
      render json: {}, status:200
    else
      render json: ["Not currently signed in."], status: 404
    end
  end

end
