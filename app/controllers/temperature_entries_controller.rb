class TemperatureEntriesController < ApplicationController
    def historical_entries
        render json: TemperatureEntry.historical.in_this_year
    end

    def forecast_entries
        render json: TemperatureEntry.forecast.in_this_year
    end

    def historical_highs_and_lows
        render json: TemperatureEntry.has_high_low
    end
end