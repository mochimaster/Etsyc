json.array! @listings do |listing|
  json.extract! listing, :id, :title, :description, :author_id,:price, :merchant_name
  if (listing.photo.attached?)
    json.photoUrl url_for(listing.photo)
  end
end
