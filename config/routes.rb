Rails.application.routes.draw do
  resources :resources
  resources :news
  resources :events
  resources :people

  post '/people/:id/contact', to: 'people#contact', as: 'people_contact'
  get '/people/:id/contact', to: 'people#show', as: 'people_contact_get'

  devise_for :users, :controllers => { :registrations => "registrations" }

  root 'pages#index'

  get '/topics/tags', to: 'topics#tags', :defaults => { :format => :json }
end
