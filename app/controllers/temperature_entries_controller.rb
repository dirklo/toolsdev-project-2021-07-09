class TemperatureEntriesController < ApplicationController
    def index
        render json: TemperatureEntry.less_than_1_month_old.less_than_48_hours_forecast.sort_by_date
    end
end