json.array! @listings do |listing|
  json.extract! listing, :id, :title, :description, :author_id, :price

end
