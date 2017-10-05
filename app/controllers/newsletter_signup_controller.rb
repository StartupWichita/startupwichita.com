class NewsletterSignupController < ApplicationController
    before_action :create_reader, only: [:create]
    before_action :fetch_reader, only: [:destroy]
    def create
        if @tuesday_reader.save
            flash[:notice] = "Successful Subscribed to Tuesday Newsletter!"
        else
            flash[:alert] = "#{@tuesday_reader.errors.full_messages.join(',')}"
        end
        redirect_to :back
    rescue ActionController::RedirectBackError
        redirect_to :controller => :pages, :action => :index
    end

    def destroy
        if @tuesday_reader.destroy
            flash[:notice] = "Successfully Unsubscribed from the Tuesday Newsletter!"
        else
            flash[:alert] = "Cannot Unsubscribe at Current Time. Please try again."
        end
        redirect_to :back
    rescue ActionController::RedirectBackError
        redirect_to :controller => :pages, :action => :index
    end

    protected
    def create_reader
        @tuesday_reader = TuesdayReader.new(allow_params)
    end
    
    def fetch_reader
        @tuesday_reader = TuesdayReader.where(allow_params).first unless !TuesdayReader.exists?(allow_params)
    end

    private
    def allow_params
        params.permit(:email, :person_id)
    end
end