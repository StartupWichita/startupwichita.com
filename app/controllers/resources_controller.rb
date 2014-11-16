class ResourcesController < ApplicationController
  before_filter :authenticate_user!, :except => [:index, :show]
  before_action :set_resource, only: [:show, :edit, :update, :destroy]

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
    respond_with(@resource)
  end

  def update
    @resource.update(resource_params)
    respond_with(@resource)
  end

  def destroy
    @resource.destroy
    respond_with(@resource)
  end

  private

  def set_resource
    @resource = Resource.find(params[:id])
  end

  def resource_params
    params.require(:resource).permit(:title, :content, :url)
  end
end
