class AddBcEmbedToArtists < ActiveRecord::Migration
  def change
    add_column :artists, :bc_embed, :string
  end
end
