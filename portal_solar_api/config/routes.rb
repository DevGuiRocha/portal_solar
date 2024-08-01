Rails.application.routes.draw do
  resources :clients, only: [:create, :update, :show, :destroy]

  post 'login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
