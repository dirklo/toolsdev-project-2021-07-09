require 'test_helper'

class TemperatureEntryTest < ActiveSupport::TestCase
  
  test "should_have_a_tempf" do
    entry = TemperatureEntry.new(tempf: 100)

    assert entry.tempf == 100
  end

  test "should_have_a_tempc" do
    entry = TemperatureEntry.new(tempc: 38)

    assert entry.tempc == 38
  end

  test "should_set_records_to_current_temp_if_no_previous_record" do
    entry = TemperatureEntry.new(tempf: 100, tempc: 38)
    
    assert entry.record_highf = 100
    assert entry.record_lowf = 100
    assert entry.record_highc = 38
    assert entry.record_lowc = 38
  end

  test "should_set_records_to_previous_record" do 
    date_time_old = DateTime.parse("2010-1-1 3:00:00 Central Time (US & Canada)")
    date_time_middle = DateTime.parse("2011-1-1 3:00:00 Central Time (US & Canada)")
    date_time_new = DateTime.parse("2012-1-1 3:00:00 Central Time (US & Canada)")

    entry_old = TemperatureEntry.create(tempf: 32, tempc: 0, date: date_time_old)
    entry_middle = TemperatureEntry.create(tempf: 80, tempc: 27, date: date_time_middle)
    entry_new = TemperatureEntry.create(tempf: 60, tempc: 16, date: date_time_new)

    assert entry_new.record_highf == 80
    assert entry_new.record_lowf == 32
    assert entry_new.record_highc == 27
    assert entry_new.record_lowc == 0
  end

  test "should_delete_old_records_upon_creating_new_ones_with_same_month_day_and_hour" do 
    date_time_old = DateTime.parse("2010-1-1 3:00:00 Central Time (US & Canada)")
    date_time_new = DateTime.parse("2011-1-1 3:00:00 Central Time (US & Canada)")

    entry_old = TemperatureEntry.create(tempf: 32, tempc: 0, date: date_time_old)
    entry_new = TemperatureEntry.create(tempf: 60, tempc: 16, date: date_time_new)

    assert TemperatureEntry.find_by(id: 2)
    assert_not TemperatureEntry.find_by(id: 1)
  end
end
