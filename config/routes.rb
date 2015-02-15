Rails.application.routes.draw do
  resources :resources
  resources :news
  resources :events
  resources :people do
    collection do
      post :send_message
      
      get  :claim
      post :claim
    end
  end

  devise_for :users

  match "/people/create_profile" => "people#new", as: :people_create_profile, :via => :get

  match "/people/skills/:tag" => "people#index", as: :people_with_skills, :via => :get
  match "/people/interests/:tag" => "people#index", as: :people_with_interests, :via => :get
  match "/people/roles/:tag" => "people#index", as: :people_with_role, :via => :get

  match "/profile/:slug" => "people#show", as: :profile, :via => :get

  root 'pages#index'
end
