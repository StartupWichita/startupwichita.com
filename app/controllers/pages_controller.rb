class PagesController < ApplicationController
  def index
    @people = Person.featured
    @featuredEvents = Event.featured
    @newsItems = News.all
    @resources = Resource.all
  end
end
