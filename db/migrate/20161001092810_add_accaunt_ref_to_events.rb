class AddAccauntRefToEvents < ActiveRecord::Migration
  def change
    add_reference :events, :accaunt, index: true
    add_foreign_key :events, :accaunts
  end
end
