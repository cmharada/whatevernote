class UniqueTagName < ActiveRecord::Migration
  def change
    add_column :tags, :user_id, :integer, null: false
    add_index :tags, :user_id
    add_index :tags, [:user_id, :name], unique: true
  end
end
