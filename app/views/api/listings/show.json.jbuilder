json.extract! @listing, :id, :title, :description, :author_id, :overview, :price, :photo, :merchant_name
if (@listing.photo.attached?)
  json.photoUrl url_for(@listing.photo)
end
json.merchantName @listing.author.merchant_name
