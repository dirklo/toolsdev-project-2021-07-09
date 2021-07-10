require 'json'
require 'rest-client'
require 'open-uri'
require 'date'

date_today = Date.today.strftime
one_month_ago = (Date.today - 30).strftime

url = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=#{ENV['API_KEY']}&q=30.404251,-97.849442&data=weather&date=#{one_month_ago}&enddate=#{date_today}&tp=1&format=json"
weather_data = open(url).read
parsed_weather_data = JSON.parse(weather_data)

all_weather_data = parsed_weather_data['data']['weather']

all_weather_data.each do |day|
    @day = Day.create(date: day['date'])
    day['hourly'].each do |hour| 
        @day.temperature_entries.create(tempf: hour['tempF'], tempc: hour['tempC'], hour: hour['time'])
    end
end


