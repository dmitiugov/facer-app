class RemoveOutsideFromSpecialGuests < ActiveRecord::Migration
  def change
    remove_column :special_guests, :outside, :boolean
  end
end
