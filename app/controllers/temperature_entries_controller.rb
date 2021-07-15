class TemperatureEntriesController < ApplicationController
    def index
        render json: TemperatureEntry.less.than_1_month_old.sort_by_date
    end
end