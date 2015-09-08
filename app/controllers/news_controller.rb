class NewsController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show, :feed]
  before_action :set_news, only: [:show, :edit, :update, :destroy]
  before_filter :can_edit_news?, :only => [:edit, :update, :destroy]

  respond_to :html

  def index
    @news = News.all
    respond_with(@news)
  end

  def show
    respond_with(@news)
  end

  def new
    @news = News.new
    respond_with(@news)
  end

  def edit
  end

  def create
    @news = News.new(news_params)
    @news.user = current_user
    @news.save
    flash[:notice] = "News Item successfully created"
    respond_with(@news)
  end

  def update
    @news.update(news_params)
    flash[:notice] = "News Item successfully updated"
    respond_with(@news)
  end

  def destroy
    @news.destroy
    flash[:notice] = "News Item successfully deleted"
    respond_with(@news)
  end

  def feed
    @news = News.all
    respond_to do |format|
      format.rss { render :layout => false }
    end
  end

  private

  def can_edit_news?
    return if can_edit? @news

    redirect_to news_path(@news), alert: "You do not have access to this news item"
  end

  def set_news
    @news = News.find(params[:id])
  end

  def news_params
    params.require(:news).permit(:title, :content, :url, :tag_list)
  end
end
