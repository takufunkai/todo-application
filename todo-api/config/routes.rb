Rails.application.routes.draw do
  resources :sessions, only: [:create]
  resources :registrations, only: [:create]
  delete :logout, to: "sessions#logout"
  get :logged_in, to: "sessions#logged_in"

  namespace :api do
    namespace :v1 do
      get '/todos', to: 'todos#index'
      post '/todos', to: 'todos#create'
      get '/todos/:id', to: 'todos#show'
      patch '/todos/:id', to: 'todos#update'
      delete '/todos/:id', to: 'todos#destroy'

    end
  end
end