class CompaniesController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show, :feed]

  def index
    @companies = Company.all

    respond_to do |format|
      format.html { @companies }
    end
  end
  
  def show
  end

  def new
  end

  def edit
  end

  def create
  end

  def update
  end

  def destroy
  end

  private

  def companie_params
    params.require(:company)
          .permit(:name,
                  :logo,
                  :website,
                  :description)
  end
end
