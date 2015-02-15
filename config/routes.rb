Rails.application.routes.draw do
  resources :resources
  resources :news
  resources :events
  resources :people

  devise_for :users

  match "/people/skills/:tag" => "people#index", as: :people_with_skills, :via => :get
  match "/people/interests/:tag" => "people#index", as: :people_with_interests, :via => :get
  match "/people/roles/:tag" => "people#index", as: :people_with_role, :via => :get

  match "/profile/:slug" => "people#show", as: :profile, :via => :get

  root 'pages#index'
end
