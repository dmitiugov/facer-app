class CreateAccaunts < ActiveRecord::Migration
  def change
    create_table :accaunts do |t|
      t.string :name
      t.string :description
      t.timestamps null: false
    end
  end
end
