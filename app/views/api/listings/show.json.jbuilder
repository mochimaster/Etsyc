json.extract! @listing, :id, :title, :description, :author_id, :overview, :price, :photo, :merchant_name
if (@listing.photo)
  json.photoUrl url_for(@listing.photo)
end
