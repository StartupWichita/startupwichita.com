class PeopleController < ApplicationController
  respond_to :html

  before_action :set_user, only: [:show, :contact]

  def index
    @users = User.all
    respond_with(@users)
  end

  def show
    respond_with(@user)
  end

  def contact
    begin
      UserMailer.contact_user(@user, params[:name], params[:message]).deliver!
      flash[:notice] = "Your message has been successfully delivered."
    rescue Exception => e
      flash[:alert] = "Your message failed to send.  Please try again later."
      return render :show
    end
    return redirect_to person_path(@user)
  end

  private

  def set_user
    @user = User.find(params[:id])
  end
end
