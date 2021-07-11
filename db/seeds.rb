require 'json'
require 'rest-client'
require 'open-uri'
require 'date'


# Backlog data from 1 month ago, to populate database
date_today = (Date.today + 2).strftime
one_month_ago = (Date.today - 30).strftime

url = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=#{ENV['API_KEY']}&q=30.404251,-97.849442&data=weather&date=#{one_month_ago}&enddate=#{date_today}&tp=1&format=json"
weather_data = open(url).read
parsed_weather_data = JSON.parse(weather_data)
all_weather_data = parsed_weather_data['data']['weather']

# Creating DB objects:
# TemperatureEntry(tempf, tempc, date)
all_weather_data.each do |day|
    day['hourly'].each do |hour|
        date_time = DateTime.parse(
            "#{day['date']} #{hour['time'].delete_suffix('00')}:00:00 Central Time (US & Canada)"
        )
        TemperatureEntry.create(
            tempf: hour['tempF'], 
            tempc: hour['tempC'], 
            date: date_time
        )
    end
end


