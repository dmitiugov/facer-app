class RemoveInsideFromGuests < ActiveRecord::Migration
  def change
    remove_column :guests, :inside, :boolean
  end
end
