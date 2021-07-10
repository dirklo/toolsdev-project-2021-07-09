class CreateTemperatureEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :temperature_entries do |t|
      t.numeric :tempf
      t.numeric :tempc
      t.timestamp :date

      t.timestamps
    end
  end
end
