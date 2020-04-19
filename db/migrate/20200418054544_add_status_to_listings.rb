class AddStatusToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :status, :boolean
    add_index :listings, :status
  end
end
