class ResourcesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show, :feed]
  before_action :set_resource, only: [:show, :edit, :update, :destroy]
  before_filter :can_edit_resource?, :only => [:edit, :update, :destroy]

  respond_to :html

  def index
    @resources = Resource.all
    respond_with(@resources)
  end

  def show
    respond_with(@resource)
  end

  def new
    @resource = Resource.new
    respond_with(@resource)
  end

  def edit
  end

  def create
    @resource = Resource.new(resource_params)
    @resource.user = current_user
    @resource.save
    flash[:notice] = "Resource successfully created"
    respond_with(@resource)
  end

  def update
    @resource.update(resource_params)
    flash[:notice] = "Resource successfully updated"
    respond_with(@resource)
  end

  def destroy
    @resource.destroy
    flash[:notice] = "Resource successfully deleted"
    respond_with(@resource)
  end

  def feed
    @resources = Resource.all
    respond_to do |format|
      format.rss { render :layout => false }
    end
  end

  private

  def can_edit_resource?
    return if can_edit? @resource

    redirect_to resource_path(@resource), alert: "You do not have access to this resource"
  end

  def set_resource
    @resource = Resource.find(params[:id])
  end

  def resource_params
    params.require(:resource).permit(:title, :content, :url, :tag_list)
  end
end
