Rails.application.routes.draw do
  resources :clients, only: [:create, :update, :show, :destroy] do
    resources :simulations, only: [:create, :index]
  end

  post 'login', to: 'sessions#create'
  delete '/logout', to: 'sessions#destroy'
end
