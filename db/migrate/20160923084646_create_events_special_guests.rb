class CreateEventsSpecialGuests < ActiveRecord::Migration
  def change
    create_table :events_special_guests, id: false do |t|
      t.belongs_to :event, index: true
      t.belongs_to :special_guest, index: true
    end
  end
end
