class CompaniesController < ApplicationController
  before_filter :authenticate_user!, except: [:index, :show, :feed]

  def index
    @companies = Company.all

    respond_to do |format|
      format.html { @companies }
    end
  end
  
  def show
    @company = find_company
  end

  def new
    @company = Company.new
  end

  def edit
    @company = find_company
  end

  def create
    @company = Company.new(company_params)

    if @company.save
      redirect_to company_path(@company)
    else
      render action: :new
    end
  end

  def update
    @company = find_company

    if @company.update(company_params)
      redirect_to company_path(@company)
    else
      render action: :edit
    end
  end

  def destroy
    @company = find_company

    @company.destroy

    redirect_to companies_path
  end

  private

  def company_params
    params.require(:company)
          .permit(:name,
                  :logo,
                  :website,
                  :description)
  end

  def find_company
    Company.find(params[:id])
  end
end
