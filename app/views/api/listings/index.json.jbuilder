if (defined? @listings.current_page )
  json.page @listings.current_page 
  json.pages @listings.total_pages
elsif
  json.page 1
  json.total_pages 1
end

json.listings @listings do |listing|
  json.extract! listing, :id, :title, :description, :author_id,:price, :merchant_name

  if (listing.photo.attached?)
    json.photoUrl url_for(listing.photo)
  elsif (listing.photos.attached?)
    json.photoUrls listing.photos.map { |photo| url_for(photo) }
  end
  
  #if (listing.photos.attached?)
  #  json.photoUrls listing.photos.map { |photo| url_for(photo) }
  #end
  
  json.merchant_name listing.author.merchant_name
end



