Rails.application.routes.draw do
  resources :posts
  resources :users
  resources :tags, only: [:index]
  resources :comments, except: [:index]
  resources :follows, only: [:create]
  resources :associated_tags, only: [:create, :destroy]
  resources :votes, only: [:index, :create, :destroy, :update]
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  get "/other", to: "users#show_other"

  # Defines the root path route ("/")
  # root "articles#index"
  delete '/follows', to: 'follows#destroy'
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
end
