class PeopleController < InheritedResources::Base

  def index
    if params[:tag]
      @featured_people = Person.where(featured: true).tagged_with(params[:tag])
      @people = Person.where(featured: false).tagged_with(params[:tag])
    else
      @featured_people = Person.where(featured: true)
      @people = Person.where(featured: false)
    end
  end

  private

  def person_params
    params.require(:person).permit(:user_id, :first_name, :last_name, :email, :website, :company_name, :title, :twitter_username, :bio, :avatar, :skills, :interests, :skill_list, :interest_list, :role_list, :featured, :tag_list => [], :role_list_tags => [])
  end
end

