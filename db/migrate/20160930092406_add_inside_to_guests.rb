class AddInsideToGuests < ActiveRecord::Migration
  def change
    add_column :guests, :inside, :boolean
  end
end
