class AddAccauntRefToSpecialGuests < ActiveRecord::Migration
  def change
    add_reference :special_guests, :accaunt, index: true
    add_foreign_key :special_guests, :accaunts
  end
end
