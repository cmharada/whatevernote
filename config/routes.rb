Rails.application.routes.draw do
  root to: 'static_pages#splash'
  
  get '/splash', to: 'static_pages#splash'
  get '/notes', to: 'static_pages#notes'
  
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  
  namespace :api do
    resources :notebooks, only: [:create, :update, :destroy, :index, :show]
    resources :notes, only: [:create, :update, :destroy, :index, :show]
  end
end
