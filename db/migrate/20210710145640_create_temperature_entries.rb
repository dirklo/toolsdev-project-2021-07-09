class CreateTemperatureEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :temperature_entries do |t|
      t.integer :tempf
      t.integer :tempc
      t.datetime :date

      t.timestamps
    end
  end
end
