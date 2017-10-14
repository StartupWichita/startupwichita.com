class VotesController < ApplicationController
  before_filter :authenticate_user!

  def create
    votable = if params[:event_id]
      Event.find(params[:event_id])
    end
    return head(:not_found) unless votable
    return head(:forbidden) if can_edit?(votable)

    if params.key?(:upvote)
      votable.liked_by current_user
    else
      votable.disliked_by current_user
    end

    head :created
  end

  def destroy
  end

  def update
  end
end
