class PagesController < ApplicationController
  def index
    @featuredEvents = Event.featured
    @newsItems = News.all
  end
end
