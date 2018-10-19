@reviews.each do |review|

  json.review do
    json.set! review.id do
      json.extract! review, :id, :body, :listing_id, :user_id
      json.listing review.listing
      json.username review.author.username
    end
  end

end
