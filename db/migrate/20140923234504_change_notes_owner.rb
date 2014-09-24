class ChangeNotesOwner < ActiveRecord::Migration
  def change
    remove_column :notes, :notebook_id
    add_column :notes, :user_id, :integer, null: false
    
    create_table :notebook_notes do |t|
      t.integer :notebook_id, null: false
      t.integer :note_id, null: false
      t.timestamps
    end
    
    add_index :notes, :user_id
    add_index :notebook_notes, :notebook_id
    add_index :notebook_notes, :note_id, unique: true
  end
end
