class TemperatureEntry < ApplicationRecord
    scope :historical, -> { where('date <= ?', Time.new) }
    scope :forecast, -> { where('date > ?', Time.new) }
end
