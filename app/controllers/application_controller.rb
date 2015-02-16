class ApplicationController < ActionController::Base
  include ApplicationHelper
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_filter :configure_permitted_parameters, if: :devise_controller?

  helper_method :can_edit?, :can_edit?

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:account_update) << :bio << :tagline << :name << :allow_contact << :avatar << :avatar_cache << :remove_avatar
    devise_parameter_sanitizer.for(:sign_up) << :name
  end

  def can_edit?(resource)
    return false if not user_signed_in?
    return true if current_user.admin?

    return resource.user.id == current_user.id
  end

  def verify_administrator
    if !current_user.admin
      flash[:notice] = "You do not have the necessary privileges for that"
      redirect_to request.url
    end
  end
end


