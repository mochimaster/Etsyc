@carts.each do |cart_item|

  json.cart_item do
    json.set! cart_item.id do
      json.extract! cart_item, :id, :quantity, :listing_id, :user_id
      json.price cart_item.listing.price
      json.title cart_item.listing.title

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
