class AddInsideToVisits < ActiveRecord::Migration
  def change
    add_column :visits, :inside, :boolean, :default => false
  end
end
