class EventsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_filter :can_edit_event?, :only => [:edit, :update, :destroy]

  respond_to :html

  def index
    @events = Event.coming_soon
    respond_with(@events)
  end

  def show
    respond_with(@event)
  end

  def new
    @event = Event.new
    respond_with(@event)
  end

  def edit
  end

  def create
    @event = Event.new(event_params)
    @event.user = current_user
    @event.save
    flash[:notice] = "Event successfully created"
    respond_with(@event)
  end

  def update
    @event.update(event_params)
    flash[:notice] = "Event successfully updated"
    respond_with(@event)
  end

  def destroy
    @event.destroy
    flash[:notice] = "Event successfully deleted"
    respond_with(@event)
  end

  private

  def can_edit_event?
    return if can_edit? @event

    redirect_to event_path(@event), alert: "You do not have access to this event"
  end

  def set_event
    @event = Event.find(params[:id])
  end

  def event_params
    params.require(:event).permit(:title, :content, :url, :starts_at, :ends_at, :address)
  end
end
