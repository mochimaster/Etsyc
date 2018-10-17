json.array! @carts do |cart|
  json.extract! cart, :id, :quantity, :listing_id, :user_id
end
