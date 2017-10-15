module VotesHelper
  def upvote_button_class(votable)
    if current_user.voted_up_on?(votable)
      "btn bg-orange"
    else
      "btn bg-grey"
    end
  end

  def upvote_form_method(votable)
    if current_user.voted_up_on?(votable)
      :delete
    else
      :post
    end
  end
end
