json.disabled_listings @user_listings do |listing|
  json.extract! listing, :id, :title, :price, :status
end