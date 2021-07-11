class TemperatureEntriesController < ApplicationController
    def index
        render json: TemperatureEntry.all
    end
end