class CreateSpecialGuests < ActiveRecord::Migration
  def change
    create_table :special_guests do |t|
      t.string :name
      t.string :surname
      t.string :bio
      t.string :description
      t.boolean :inside
      t.boolean :outside
      t.integer :age
      t.timestamps null: false
    end
    create_table :events_parts, id: false do |t|
      t.belongs_to :event, index: true
      t.belongs_to :special_guest, index: true
    end
  end
end
