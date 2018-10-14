Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do
      resources :listings, only: [:index]
    end
    resources :listings, defaults: {format: :json}
    resource :session, only: [:create, :destroy]
  end



end
