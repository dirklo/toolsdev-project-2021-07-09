Rails.application.routes.draw do
  get '/', to: 'home#index'
  get '/historical_entries', to: 'temperature_entries#historical_entries'
  get '/forecast_entries', to: 'temperature_entries#forecast_entries'
end
