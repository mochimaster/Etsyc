if (defined? @listings.current_page )
  json.page @listings.current_page 
  json.total_pages @listings.total_pages
  json.count @listings.total_entries
elsif (defined? @categories.current_page )
  json.page @categories.current_page 
  json.total_pages @categories.total_pages
elsif
  json.page 1
  json.total_pages 1
end

json.listings @listings do |listing|
  json.extract! listing, :id, :title, :description, :author_id,:price, :msrp, :merchant_name, :status, :brand
  json.photosOrder listing.photos_order.map { |photo_order| photo_order}
  json.detailedCondition listing.detailed_condition

  if (listing.photos.attached?)
    json.photoUrls listing.photos.map { |photo| url_for(photo) }
  end

  if (listing.photo.attached?)
    json.photoUrl url_for(listing.photo)
  end

  #if (listing.photos.attached?)
  #  json.photoUrls listing.photos.map { |photo| url_for(photo) }
  #end
  
  json.merchant_name listing.author.merchant_name
end


