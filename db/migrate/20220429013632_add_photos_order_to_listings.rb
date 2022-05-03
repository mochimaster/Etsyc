class AddPhotosOrderToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :photos_order, :text, array: true, default: []
  end
end
