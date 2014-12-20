class PagesController < ApplicationController
  def index
    @users = User.all
    @featuredEvents = Event.featured
    @newsItems = News.all
    @resources = Resource.all
  end
end
