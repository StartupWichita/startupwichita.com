class PagesController < ApplicationController
  def index
    @featuredEvents = Event.featured
  end
end
