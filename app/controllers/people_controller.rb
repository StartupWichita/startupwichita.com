class PeopleController < InheritedResources::Base

  private

    def person_params
      params.require(:person).permit(:user_id, :first_name, :last_name, :email, :website, :company_name, :title, :twitter_username, :bio, :avatar, :skills, :interests, :skill_list, :interest_list, :tag_list => [])
    end
end

