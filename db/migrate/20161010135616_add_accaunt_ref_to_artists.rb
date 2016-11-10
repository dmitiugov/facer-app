class AddAccauntRefToArtists < ActiveRecord::Migration
  def change
    add_reference :artists, :accaunt, index: true
    add_foreign_key :artists, :accaunts
  end
end
