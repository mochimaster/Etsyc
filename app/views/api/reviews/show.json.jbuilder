json.extract! @review, :id, :body, :user_id, :listing_id
json.username @review.author.username
