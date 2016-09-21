class RemoveAfishaFromEvents < ActiveRecord::Migration
  def change
    remove_column :events, :afisha
  end
end
