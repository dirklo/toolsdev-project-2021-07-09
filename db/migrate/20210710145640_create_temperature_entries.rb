class CreateTemperatureEntries < ActiveRecord::Migration[5.2]
  def change
    create_table :temperature_entries do |t|
      t.datetime :date
      t.integer :tempf
      t.integer :tempc
      t.integer :record_highf
      t.integer :record_highc
      t.integer :record_lowf
      t.integer :record_lowc
      t.boolean :historical, default: true

      t.timestamps
    end
  end
end
