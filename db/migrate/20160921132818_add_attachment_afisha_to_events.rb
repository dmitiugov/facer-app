class AddAttachmentAfishaToEvents < ActiveRecord::Migration
  def self.up
    change_table :events do |t|
      t.attachment :afisha
    end
  end

  def self.down
    remove_attachment :events, :afisha
  end
end
