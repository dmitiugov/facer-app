class RemoveInsideFromSpecialGuests < ActiveRecord::Migration
  def change
    remove_column :special_guests, :inside, :boolean
  end
end
