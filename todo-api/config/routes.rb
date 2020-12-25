Rails.application.routes.draw do
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