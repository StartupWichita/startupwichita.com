class PagesController < ApplicationController
  def index
    @users = User.featured
    @featuredEvents = Event.featured
    @newsItems = News.all
    @resources = Resource.all
  end
end
