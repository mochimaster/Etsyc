class ApplicationController < ActionController::Base
  before_action :redirect_to_castleandchair if Rails.env == 'production'

  # protect_from_forgery with: :exception
  protect_from_forgery with: :null_session

  # Expose these methods to the views
  helper_method :current_user, :signed_in?

  def current_user
    @current_user ||= User.find_by_session_token(session[:session_token])
  end

  def signed_in?
    !!current_user
  end

  def sign_in(user)

    session[:session_token] = user.reset_session_token!
    # debugger
    @current_user = user

  end

  def sign_out
    current_user.reset_session_token!
    session[:session_token] = nil
    @current_user = nil
  end

  def require_sign_in!
    render json: ['Not logged in.'], status: 401
  end

  private
  def redirect_to_castleandchair
    domain_to_redirect_to = 'castleandchair.com'
    domain_exceptions = ['castleandchair.com', 'www.castleandchair.com']
    should_redirect = domain_exceptions.exclude? request.host
    new_url = "#{request.protocol}#{domain_to_redirect_to}#{request.fullpath}"
    redirect_to new_url, status: :moved_permanently if should_redirect
  end


end
