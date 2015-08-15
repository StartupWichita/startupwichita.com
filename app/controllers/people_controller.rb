class PeopleController < InheritedResources::Base
  before_filter :authenticate_user!, :except => [:index, :show]
  before_filter :get_person_and_verify_ownership, :only => [:edit, :update]
  before_filter :verify_administrator, :only => [:create, :destroy, :new]


  def index
    if params[:tag]
      @featured_people = Person.where(featured: true).tagged_with(params[:tag])
      @people = Person.where(featured: false).tagged_with(params[:tag])
    else
      @featured_people = Person.where(featured: true)
      @people = Person.where(featured: false)
    end
  end

  def show
    @person = Person.friendly.find(params[:slug])
    @person_email = PersonEmail.new(person_id: @person.id)
  end

  def edit
  end

  def send_message
    @person_email = PersonEmail.new(person_email_params)
    @person = Person.find(@person_email.person_id)

    @person_email.recipient_email = @person.email

    if @person_email.save
      flash[:message] = "Your message was sent."
      redirect_to action: :index
    else
      render :action => "show"
    end
  end

  def new
    @person = Person.new()
  end

  def create
    @person = Person.new(person_params)
    if @person.save
      redirect_to profile_path(slug: @person.slug)
    else
      render :action => "new"
    end
  end

  def update
    if @person.update(person_params)
      redirect_to profile_path(slug: @person.slug)
    else
      render 'edit'
    end
  end

  private

  def person_email_params
    params.require(:person_email).permit(:recipient_email, :sender_email, :message, :sender_phone, :person_id, :sender_name)
  end

  def person_params
    params.require(:person).permit(:user_id, :first_name, :last_name, :email, :website, :company_name, :title, :twitter_username, :bio, :avatar, :skills, :interests, :skill_list, :interest_list, :role_list, :featured, :tag_list => [], :role_list_tags => [])
  end

  def get_person_and_verify_ownership
    @person = Person.friendly.find(params[:id])
    if !current_user.admin && @person.user_id != current_user.id
      flash[:notice] = "Do do not own that record."
      redirect_to action: :index
    end
  end
end
