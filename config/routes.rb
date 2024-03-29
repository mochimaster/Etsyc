Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root "static_pages#root"

  match "/visit" => redirect("/#/visit"), :via => [:get]
  match "/faq" => redirect("/#/faq"), :via => [:get]
  match "/listings" => redirect("/#/listings"), :via => [:get]
  match "/sitemap/sitemap.xml", :to => "sitemap#index", :via => [:get],  :defaults => {:format => :xml}

  namespace :api, defaults: {format: :json} do
    resources :users, only: [:create, :show] do
      resources :listings, only: [:index]
      resources :carts, except: [:new]
      resources :home, only: [:index] do
        resources :search, only: [:index]
      end
      resources :reset, only: [:create], defaults: {format: :json}
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
