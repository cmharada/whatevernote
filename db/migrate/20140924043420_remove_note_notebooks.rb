class RemoveNoteNotebooks < ActiveRecord::Migration
  def change
    drop_table :notebook_notes
    add_column :notes, :notebook_id, :integer
    
    add_index :notes, :notebook_id
  end
end
