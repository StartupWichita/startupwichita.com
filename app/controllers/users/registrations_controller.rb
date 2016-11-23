class Users::RegistrationsController < Devise::RegistrationsController

  def create
    super do
      if resource.persisted?
      else
        flash[:alert] = resource.errors.full_messages.join(", ")
      end
    end
  end

  protected

  def after_sign_up_path_for(resource)
    flash[:notice] = "Please complete your profile information."
    edit_user_registration_path(current_user)
  end

  def sign_up_params
    params.require(:user).permit(:email, :password, :password_confirmation, :remember_me)
  end

  def account_update_params
    params.require(:user).permit(:email, :password, :password_confirmation, :current_password, :person_attributes => [:id, :user_id, :first_name, :last_name, :email, :website, :company_name, :title, :twitter_username, :bio, :avatar, :phone, :delete_avatar, :allow_contact, :skills, :interests, :skill_list, :interest_list, :role_list, :featured, :tag_list => [], :role_list_tags => []])
  end

  def update_resource(resource, params)
    resource.update_without_password(params)
  end

end
