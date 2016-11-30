class DropEventsParts < ActiveRecord::Migration
  def up
    drop_table :events_parts
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
