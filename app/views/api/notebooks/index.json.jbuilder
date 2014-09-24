json.array! @notebooks do |notebook|
  json.(notebook, :id, :title, :created_at, :updated_at)

  json.note_count notebook.notes.length
end