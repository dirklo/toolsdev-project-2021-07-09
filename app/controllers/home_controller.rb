class HomeController < ApplicationController 
    def index
        @temperature_entries = TemperatureEntry.all
        render 'home/index'
    end
end
