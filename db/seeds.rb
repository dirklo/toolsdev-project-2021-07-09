require 'json'
require 'rest-client'
require 'open-uri'

url = "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=#{ENV['API_KEY']}&q=30.404251,-97.849442&data=weather&date=2021-06-20&format=json"
weather_data = open(url).read

ap weather_data