class PagesController < ApplicationController
  def index
    @featuredEvents = Event.featured
    @newsItems = News.all
    @resources = Resource.all
  end
end
