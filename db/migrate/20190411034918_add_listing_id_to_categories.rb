class AddListingIdToCategories < ActiveRecord::Migration[5.2]
  def change
    add_column :categories, :listing_id, :integer, presence: true
    add_column :categories, :category, :integer, presence: true
    add_index :categories, :listing_id
    add_index :categories, :category

  end
end
