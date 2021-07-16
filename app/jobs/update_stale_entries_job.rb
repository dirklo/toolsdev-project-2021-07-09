class UpdateStaleEntriesJob < ApplicationJob
  queue_as :default

  def perform(*args)
    # Check all entries for stale entries
    entries_to_check = TemperatureEntry.stale.sort_by_date

    # Create list of dates with stale info
    if !entries_to_check.empty?
      dates_to_update = []
      entries_to_check.each do |entry| 
        date = entry.date.strftime('%Y-%m-%d')
        dates_to_update << date unless dates_to_update.include?(date)
      end

      # Update the days with stale info
      TemperatureEntry.fetch_entries_in_date_range(dates_to_update[0], dates_to_update[-1])
    else
      puts 'No stale entries found'
    end
  end
end
