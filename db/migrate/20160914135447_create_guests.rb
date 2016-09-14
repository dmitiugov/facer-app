class CreateGuests < ActiveRecord::Migration
  def change
    create_table :guests do |t|
      t.references :event, index: true
      t.string :name
      t.string :surname
      t.string :bio
      t.integer :age
      t.timestamps null: false
    end
    add_foreign_key :guests, :events
  end
end
