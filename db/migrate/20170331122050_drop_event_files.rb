class DropEventFiles < ActiveRecord::Migration
  def change
    drop_table :event_files
  end
end
