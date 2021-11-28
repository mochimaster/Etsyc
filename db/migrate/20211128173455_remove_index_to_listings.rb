class RemoveIndexToListings < ActiveRecord::Migration[5.2]
  def change
    remove_index :listings, name: "index_listings_on_title"
  end
end
