class Api::ResetController < ApplicationController

    def create
        @user = User.find_by_credentials(
            params[:username],
            params[:existingPassword]
        )

        if @user && @user.id.to_s == params[:session]
            if @user.update_attributes(:password_digest => BCrypt::Password.create(params[:newPassword1]))     
                render json: ['Password updated successfully.'], status: 201
            else
                render json: ['Password update failed. Please try again.'], status: 401
            end
        else
            render json: ['Existing password incorrect.'], status: 401
        end
    end
end