module VotesHelper
  def upvote_button_class(votable)
    if current_user.upvoted?(votable)
      "btn bg-orange"
    else
      "btn bg-grey"
    end
  end

  def downvote_button_class(votable)
    if current_user.downvoted?(votable)
      "btn bg-orange"
    else
      "btn bg-grey"
    end
  end
end
