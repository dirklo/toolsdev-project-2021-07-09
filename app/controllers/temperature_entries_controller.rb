class TemperatureEntriesController < ApplicationController
    def historical_entries
        render json: TemperatureEntry.historical
    end

    def forecast_entries
        render json: TemperatureEntry.forecast
    end
end