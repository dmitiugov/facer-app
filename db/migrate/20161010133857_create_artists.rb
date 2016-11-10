class CreateArtists < ActiveRecord::Migration
  def change
    create_table :artists do |t|
      t.string :name
      t.string :description
      t.string :soundcloud
      t.string :wikipedia
      t.string :bandcamp
      t.string :facebook
      t.string :vk
      t.string :bio
      t.timestamps null: false
    end
  end
end
