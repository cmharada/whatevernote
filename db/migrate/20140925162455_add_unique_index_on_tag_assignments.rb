class AddUniqueIndexOnTagAssignments < ActiveRecord::Migration
  def change
    add_index :tag_assignments, [:tag_id, :note_id], unique: true
  end
end
