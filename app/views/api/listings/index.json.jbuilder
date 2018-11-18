json.array! @listings do |listing|
  json.extract! listing, :id, :title, :description, :author_id,:price, :merchant_name


  if (listing.photo.attached?)
    json.photoUrl url_for(listing.photo)
  end

  if (listing.photos.attached?)
    json.photoUrls listing.photos.map { |file| url_for(file) }
  end
  

  json.merchant_name listing.author.merchant_name
end
