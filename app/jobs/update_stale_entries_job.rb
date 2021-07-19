class UpdateStaleEntriesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # If data is not at least 3 days out, fill in needed entries
    TemperatureEntry.fill_needed_data

    # Check all entries for stale entries
    entries_to_check = TemperatureEntry.stale.sort_by_date

    # Create list of dates with stale info
    if !entries_to_check.empty?
      dates_to_update = []
      entries_to_check.each do |entry|
        if entry.date.hour <= 6
          date = (entry.date - 1.day).strftime('%Y-%m-%d')
        else
          date = entry.date.strftime('%Y-%m-%d')
        end
        dates_to_update << date unless dates_to_update.include?(date)
      end

      puts 'updating stale entries'

      # Update the days with stale info
      TemperatureEntry.fetch_entries_in_date_range(dates_to_update[0], dates_to_update[-1])
    else
      puts 'No stale entries found'
    end
  end
end
