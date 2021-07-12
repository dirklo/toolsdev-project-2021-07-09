class TemperatureEntry < ApplicationRecord
    scope :historical, -> { where('date <= ?', Time.new) }
    scope :forecast, -> { where('date > ?', Time.new) }

    def historical_high_and_low()
        month = self.date.to_time.month
        day = self.date.to_time.day
        hour = self.date.to_time.hour

        @entries = TemperatureEntry.all.filter do |entry| 
            entry.date.to_time.month == month && 
            entry.date.to_time.day == day && 
            entry.date.to_time.hour == hour
        end

        lowestTemp = Float::INFINITY
        highestTemp = -Float::INFINITY

        @entries.each do |entry| 
            if entry['tempf'] > highestTemp
                highestTemp = entry['tempf']
            end    
            if entry['tempf'] < lowestTemp
                lowestTemp = entry['tempf']
            end    
        end
        [lowestTemp, highestTemp]
    end
end
