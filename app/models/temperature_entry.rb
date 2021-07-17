require 'json'
require 'rest-client'
require 'open-uri'
require 'date'

class TemperatureEntry < ApplicationRecord
    before_create :set_records, :set_historical

    scope :sort_by_date, -> { order(:date) }
    scope :less_than_1_month_old, -> { where('date >= ?', Time.new - 1.month) }
    scope :less_than_48_hours_forecast, -> { where('date < ?', Time.new + 48.hours) }
    scope :stale, -> { where('date <=? AND historical = ?', Time.new, false) }

    # Pass in a url to create all ruby object from the api call
    def self.create_entries(url)
        weather_data = open(url).read
        parsed_weather_data = JSON.parse(weather_data)
        all_weather_data = parsed_weather_data['data']['weather']
        all_weather_data.each do |day|
            day['hourly'].each do |hour|
                date_time = DateTime.parse(
                    "#{day['date']} #{hour['time'].delete_suffix('00')}:00:00 Central Time (US & Canada)"
                )
                attributes = { 
                    tempf: hour['tempF'].to_i, 
                    tempc: hour['tempC'].to_i, 
                    date: date_time 
                }
                TemperatureEntry.create(attributes)
            end
        end
    end

    # Use to build historical entries
    def self.fetch_entries_in_date_range(start_date, end_date)
        currentUrl = "http://api.worldweatheronline.com/premium/v1/past-weather.ashx?key=#{ENV['API_KEY']}&q=30.404251,-97.849442&data=weather&date=#{start_date}&enddate=#{end_date}&tp=1&format=json"
        create_entries(currentUrl)
    end

    # Use to build current day or forecast entries
    def self.fetch_daily_entries(date)
        currentUrl = "http://api.worldweatheronline.com/premium/v1/weather.ashx?key=#{ENV['API_KEY']}&q=30.404251,-97.849442&format=json&num_of_days=1&date=#{date}&tp=1"
        create_entries(currentUrl)
    end

    # Auto-fill historical entries based on most recent entry
    def self.create_historical_entries
        most_recent_date = TemperatureEntry.order(:date).last.date
        num_entries_in_day = TemperatureEntry.where(
            'extract(month from date) = ? AND extract(day from date) = ? AND extract(year from date) = ?', 
            most_recent_date.month, most_recent_date.day, most_recent_date.year
        ).count
            
        start_date = most_recent_date.strftime('%Y-%m-%d')
        end_date = (most_recent_date + 30.days).strftime('%Y-%m-%d')

        puts "fetching between #{start_date} and #{end_date}"

        fetch_entries_in_date_range(start_date, end_date)
    end

    # Use to check current data and fill current day or forecast entries.
    def self.fill_needed_data 
        most_recent_date = TemperatureEntry.order(:date).last.date
        while most_recent_date < Date.today + 3.days
            most_recent_date = TemperatureEntry.order(:date).last.date
            date = most_recent_date.strftime('%Y-%m-%d')
            
            fetch_daily_entries(date) if most_recent_date >= Time.new
            fetch_entries_in_date_range(date, date) if most_recent_date < Time.new
        end
    end

    def self.test
        puts "I AM A TEST AND SHOULD RUN EVERY MINUTE"
    end

    private
        def set_records 
            previous_entry = TemperatureEntry.find do |entry|
                entry.date.day == self.date.day && 
                entry.date.month == self.date.month && 
                entry.date.hour == self.date.hour
            end
            if !!previous_entry
                self.record_highc = [self.tempc, previous_entry.record_highc].max
                self.record_highf = [self.tempf, previous_entry.record_highf].max
                self.record_lowf = [self.tempf, previous_entry.record_lowf].min
                self.record_lowc = [self.tempc, previous_entry.record_lowc].min
                previous_entry.destroy
            else
                self.record_highf = self.tempf
                self.record_highc = self.tempc
                self.record_lowf = self.tempf
                self.record_lowc = self.tempc
            end
        end

        def set_historical
            self.historical = false if self.date > Time.new
        end
end
