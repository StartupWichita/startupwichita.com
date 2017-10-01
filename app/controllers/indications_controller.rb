class IndicationsController < ApplicationController
  INDICATION_TYPES = %i(event news resource)
  before_filter :authenticate_user!

  def create
    return unless INDICATION_TYPES.include?(params[:type].to_sym)
    params[:type].capitalize.constantize.find(params[:id]).indications.create(user_id: current_user.id)
    redirect_to :back, notice: 'Thank you, admins has been notified!'
  end
end
