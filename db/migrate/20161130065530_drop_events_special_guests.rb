class DropEventsSpecialGuests < ActiveRecord::Migration
  def up
    drop_table :events_special_guests
  end

  def down
    raise ActiveRecord::IrreversibleMigration
  end
end
