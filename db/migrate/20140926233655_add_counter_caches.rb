class AddCounterCaches < ActiveRecord::Migration
  def change
    add_column :notebooks, :notes_count, :integer, default: 0
    add_column :tags, :notes_count, :integer, default: 0
    Notebook.find_each do |notebook|
      notebook.update(notes_count: notebook.notes.length)
    end
    Tag.find_each do |tag|
      tag.update(notes_count: tag.notes.length)
    end
  end
end
