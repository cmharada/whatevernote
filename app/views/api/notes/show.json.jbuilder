json.(@note, :id, :title, :contents, :created_at, :updated_at, :notebook_id)

json.tags @note.tags do |tag|
  json.name tag.name
  json.id tag.id
end