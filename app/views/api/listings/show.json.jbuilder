json.extract! @listing, :id, :title, :description, :author_id, :overview, :price, :merchant_name, :status, :condition

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