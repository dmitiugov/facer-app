class CreateEventFiles < ActiveRecord::Migration
  def change
    create_table :event_files do |t|
      t.string :url
      t.timestamps null: false
    end
  end
end
