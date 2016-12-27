class AddTypeToSpecials < ActiveRecord::Migration
  def change
    add_column :special_guests, :guest_type, :string, :default=>'special'
  end
end
