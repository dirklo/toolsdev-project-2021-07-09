class HomeController < ApplicationController 
    def index
        @temperature_entries = ajax({
            url: "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=#{ENV['API_KEY']}&q=30.404251,-97.849442&data=weather",
            type: "get"
        })
        byebug
        render 'home/index'
    end
end
