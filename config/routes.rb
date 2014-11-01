Rails.application.routes.draw do
  resources :resources
  resources :news
  resources :events

  devise_for :users

  root 'pages#index'
end
