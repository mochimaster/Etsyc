if (defined? @user_listings.current_page )
  json.page @user_listings.current_page 
  json.total_pages @user_listings.total_pages
elsif
  json.page 1
  json.total_pages 1
end

json.disabled_listings @user_listings do |listing|
  json.extract! listing, :id, :title, :price, :status

  if (listing.photo.attached?)
    json.photoUrl url_for(listing.photo)
  elsif (listing.photos.attached?)
    json.photoUrls listing.photos.map { |photo| url_for(photo) }
  end
end