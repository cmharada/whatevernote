json.array! @notebooks do |notebook|
  json.(notebook, :id, :title, :created_at, :updated_at, :notes_count)
end