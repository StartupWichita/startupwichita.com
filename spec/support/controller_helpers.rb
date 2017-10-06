module ControllerHelpers
  def sign_in(user)
    return if user.nil?
    allow(request.env['warden']).to receive(:authenticate!).and_return(user)
    user.admin ? admin(user) : current_user(user)
  end

  def admin(user)
    allow_any_instance_of(ApplicationController).to receive(:verify_administrator).and_return(true)
    current_user(user)
  end

  def current_user(user)
    allow_any_instance_of(ApplicationController).to receive(:current_user).and_return(user)
  end
end