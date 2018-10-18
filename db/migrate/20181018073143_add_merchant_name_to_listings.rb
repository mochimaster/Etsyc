class AddMerchantNameToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :merchant_name, :string
  end
end
