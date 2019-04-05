json.extract! @listing, :id, :title, :description, :author_id, :overview, :price, :merchant_name

#if (@listing.photo.attached?)
#  json.photoUrl url_for(@listing.photo)
#end

json.merchantName @listing.author.merchant_name

if (@listing.photos.attached?)
  json.photoUrls @listing.photos.map { |file| url_for(file) }
end

