class TopicsController < ApplicationController
  respond_to :json

  def tags
    tags = ActsAsTaggableOn::Tag.all.map(&:name)

    respond_to do |format|
      format.json { render json: tags }
    end
  end
end
