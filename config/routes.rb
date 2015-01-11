Rails.application.routes.draw do
  resources :resources
  resources :news
  resources :events
  resources :people

  devise_for :users

  root 'pages#index'

  get '/topics/tags', to: 'topics#tags', :defaults => { :format => :json }
end
