class AddAccauntRefToUsers < ActiveRecord::Migration
  def change
    add_reference :users, :accaunt, index: true
    add_foreign_key :users, :accaunts
  end
end
