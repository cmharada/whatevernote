json.array! @tags do |tag|
  json.(tag, :id, :name, :created_at, :updated_at, :notes_count)
end