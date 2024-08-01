Rails.application.routes.draw do
  resources :clients, only: [:create, :update, :show]
  post 'login', to: 'sessions#create'
end
