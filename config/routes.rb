Rails.application.routes.draw do
  root to: 'static_pages#notes'
  
  get '/welcome', to: 'static_pages#welcome'
  get '/notes', to: 'static_pages#notes'
  
  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]
  
  namespace :api, defaults: { format: :json } do
    resources :notebooks, only: [:create, :update, :destroy, :index, :show]
    resources :notes, only: [:create, :update, :destroy, :index, :show]
    resources :tags, only: [:create, :index, :show]
    resources :tag_assignments, only: [:create]
  end
end
