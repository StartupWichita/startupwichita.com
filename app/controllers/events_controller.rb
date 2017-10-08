class EventsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show, :feed]
  before_action :set_event, only: [:show, :edit, :update, :destroy]
  before_filter :can_edit_event?, :only => [:edit, :update, :destroy]

  respond_to :html

  #to use mentions helper in view
  include MentionsHelper

  def index
    if params[:person] then
      person    = Person.find_by(slug: params[:person])
      @events   = person ? person.events.active : []
      @upcoming = person ? person.events.upcoming : []
      @recent   = person ? person.events.recent : []
    else
      @upcoming = Event.upcoming
      @recent   = Event.recent
      @events   = Event.active
    end
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
    PersonMentions.extract_and_link!(@event)
    flash[:notice] = "Event successfully created"
    respond_with(@event)
  end

  def update
    @event.update(event_params)
    PersonMentions.extract_and_link!(@event)
    flash[:notice] = "Event successfully updated"
    respond_with(@event)
  end

  def destroy
    @event.destroy
    flash[:notice] = "Event successfully deleted"
    respond_with(@event)
  end


  def feed
    @events = Event.all
    respond_to do |format|
      format.rss { render :layout => false }
    end
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
    params.require(:event).permit(:title, :content, :url, :starts_at, :ends_at, :address, :tag_list, :tag_list => [])
  end
end
