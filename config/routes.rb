Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do
      resources :listings, only: [:index]
      resources :carts, except: [:new]
      resources :home, only: [:index] do
        resources :search, only: [:index]
      end
    end
    resources :listings, defaults: {format: :json} do
      resources :reviews, only: [:index]
      patch '/renew', to: 'listings#renew'
      resources :search, only: [:index]
    end
    resources :reviews, except: [:new, :index],defaults: {format: :json}
    resource :session, only: [:create, :destroy]
    resources :search, only: [:index]
    resources :categories, except: [:new, :destroy], defaults: {format: :json}
  end
end
