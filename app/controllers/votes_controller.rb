class VotesController < ApplicationController
  before_filter :authenticate_user!
  before_filter :set_votable
  before_filter :ensure_votable

  def create
    if params.key?(:upvote)
      @votable.liked_by current_user
    else
      @votable.disliked_by current_user
    end

    if @votable.vote_registered?
      render partial: 'votes/form', locals: { votable: @votable }
    else
      head :unprocessable_entity
    end
  end

  def destroy
    if current_user.voted_for?(@votable)
      @votable.unvote_by current_user
    end

    render partial: 'votes/form', locals: { votable: @votable }
  end

  private

  def set_votable
    model = if params[:votable_type] == "Event"
      Event
    end

    if model
      @votable = model.find(params[:votable_id])
    end
  end

  def ensure_votable
    return head(:not_found) unless @votable

    # Disallow users to vote on their own items:
    head :forbidden if can_edit?(@votable)
  end
end
