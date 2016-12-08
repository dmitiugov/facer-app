class AddOnstageToShows < ActiveRecord::Migration
  def change
    add_column :shows, :on_stage, :boolean, :default => false
  end
end
