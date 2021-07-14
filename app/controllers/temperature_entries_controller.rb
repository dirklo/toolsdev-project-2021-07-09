class TemperatureEntriesController < ApplicationController
    def historical_entries
        render json: TemperatureEntry.historical.less_than_1_month_old.sort_by_date
    end

    def forecast_entries
        render json: TemperatureEntry.forecast.sort_by_date
    end
end