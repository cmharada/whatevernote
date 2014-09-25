json.(@tag, :id, :name, :created_at, :updated_at)

json.note_count @tag.notes.length