class CreateShows < ActiveRecord::Migration
  def change
    create_table :shows do |t|
      t.belongs_to :artist, index: true
      t.belongs_to :event, index: true
      t.string :time_start
      t.string :time_end
      t.timestamps null: false
    end
  end
end
