class CreateNotes < ActiveRecord::Migration
  def change
    create_table :notes do |t|
      t.string :title, null: false
      t.integer :notebook_id, null: false
      t.text :contents
      t.timestamps
    end
    add_index :notes, :notebook_id
  end
end
