class AddInsideToGuestsDefault < ActiveRecord::Migration
  def change
    add_column :guests, :inside, :boolean, :default => false
  end
end
