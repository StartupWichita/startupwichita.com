class IndicationsController < ApplicationController
  INDICATION_TYPES = %i(event news resource)
  before_filter :authenticate_user!

  def create
    return unless INDICATION_TYPES.include?(params[:type].to_sym)

    model      = params[:type].capitalize.constantize
    indication = model.find(params[:id]).indications.new(user_id: current_user.id)

    if indication.save
      User.admins.each { |admin| UserMailer.indicate(indication, admin).deliver }
      redirect_to :back, notice: 'Thank you, admins has been notified!'
    end
  end
end
