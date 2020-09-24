class AddRenewedAtToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :renewed_at, :datetime
  end
end
