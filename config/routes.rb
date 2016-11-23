Rails.application.routes.draw do
  
  get '/events/feed' => 'events#feed'
  get '/news/feed' => 'news#feed'
  get '/people/feed' => 'people#feed'
  get '/resources/feed' => 'resources#feed'
  
  resources :resources
  resources :news
  resources :events
  resources :at_who

  resources :people do
    collection do
      post :send_message
    end
  end
  
  get '/people/claim/:slug', to: 'people#claim', as: 'people_claim'
  post '/people/claim/:slug', to: 'people#claim_person', as: 'people_claim_person'

  post '/people/:id/contact', to: 'people#contact', as: 'people_contact'
  get '/people/:id/contact', to: 'people#show', as: 'people_contact_get'

  devise_for :users, :controllers => { :registrations => "users/registrations", :omniauth_callbacks => "users/omniauth_callbacks" }

  match "/people/create_profile" => "people#new", as: :people_create_profile, :via => :get

  match "/people/skills/:tag" => "people#index", as: :people_with_skills, :via => :get
  match "/people/interests/:tag" => "people#index", as: :people_with_interests, :via => :get
  match "/people/roles/:tag" => "people#index", as: :people_with_role, :via => :get

  match "/profile/:slug" => "people#show", as: :profile, :via => :get

  root 'pages#index'

  get '/topics/tags', to: 'topics#tags', :defaults => { :format => :json }

  match "/slack" => redirect("http://startupwichita-slackin.herokuapp.com"), as: :slack, via: :get
end
