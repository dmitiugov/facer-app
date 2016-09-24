class AddAttachmentAvatarToSpecialGuests < ActiveRecord::Migration
  def self.up
    change_table :special_guests do |t|
      t.attachment :avatar
    end
  end

  def self.down
    remove_attachment :special_guests, :avatar
  end
end
