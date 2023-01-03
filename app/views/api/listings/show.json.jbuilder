json.extract! @listing, :id, :title, :description, :author_id, :overview, :price, :msrp, :merchant_name, :status, :condition, :brand
json.photosOrder @listing.photos_order.map { |photo_order| photo_order}
json.detailedCondition @listing.detailed_condition

if @listing.is_requested_by_author
  json.internalNote @listing.internal_note
  json.internalPhotoUrls @listing.internal_photos.map { |file| url_for(file) }
end

if (@listing.photo.attached?)
  json.photoUrl url_for(@listing.photo)
end

if(@listing.photos.attached?)
  json.photoUrls @listing.photos.map { |file| url_for(file) }
end


json.merchantName @listing.author.merchant_name
json.phoneNumber @listing.author.phone_number

#if (@listing.photos.attached?)
#  json.photoUrls @listing.photos.map { |file| url_for(file) }
#end

json.category do
  json.array! @listing.categories.map{|category| category.category.to_s }
end