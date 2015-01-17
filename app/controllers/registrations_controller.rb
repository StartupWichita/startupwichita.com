class RegistrationsController < Devise::RegistrationsController
  def after_sign_up_path_for(resource)
    flash[:notice] = "Please complete your profile information."
    edit_user_registration_path(current_user)
  end
end
