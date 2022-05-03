@carts.each do |cart_item|
  json.cart_item do
    json.set! cart_item.id do
      json.extract! cart_item, :id, :quantity, :listing_id, :user_id
      json.price cart_item.listing.price
      json.title cart_item.listing.title
      json.merchant_name cart_item.listing.author.merchant_name
      json.author_id cart_item.listing.author.id
      json.brand cart_item.listing.brand
      json.photosOrder cart_item.listing.photos_order.map { |photo_order| photo_order}
      if(cart_item.listing.photo.attached?)
        json.photoUrl url_for(cart_item.listing.photo)
      end
      if(cart_item.listing.photos.attached?)
        json.photoUrl url_for(cart_item.listing.photos[0])
      end
    end
  end

  json.listings do
    json.set! cart_item.listing.id do
      json.id cart_item.listing.id
      json.title cart_item.listing.title
      json.price cart_item.listing.price
    end
  end
end
