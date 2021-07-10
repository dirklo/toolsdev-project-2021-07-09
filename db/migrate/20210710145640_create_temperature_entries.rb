class CreateTemperatureEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :temperature_entries do |t|
      t.integer :tempf
      t.integer :tempc
      t.integer :hour
      t.integer :day_id

      t.timestamps
    end
  end
end
