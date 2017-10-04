class NewsletterSignupController < ApplicationController
    before_action :create_reader, only: [:post]
    def post
        if @tuesday_reader.save
            flash[:notice] = "Successful!"
        else
            flash[:alert] = "#{@tuesday_reader.errors.full_messages.join(',')}"
        end
        redirect_to :back
    rescue ActionController::RedirectBackError
        redirect_to :controller => :pages, :action => :index
    end

    def create_reader
        @tuesday_reader = TuesdayReader.new(allow_params)
    end

    private
    def allow_params
        params.permit(:email, :person_id)
    end
end