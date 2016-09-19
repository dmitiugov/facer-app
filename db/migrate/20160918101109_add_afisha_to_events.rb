class AddAfishaToEvents < ActiveRecord::Migration
  def change
    add_column :events, :afisha, :string
  end
end
