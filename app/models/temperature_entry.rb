class TemperatureEntry < ApplicationRecord
    before_create :set_records

    # scope :historical, -> { where('date <= ?', Time.new) }
    # scope :forecast, -> { where('date > ?', Time.new) }
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
end
