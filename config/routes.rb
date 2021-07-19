Rails.application.routes.draw do
  get '/', to: 'home#index'
  resources :temperature_entries, only: :index
end
