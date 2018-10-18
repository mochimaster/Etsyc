class AddMerchantNameToUsers < ActiveRecord::Migration[5.2]
  def change
    add_column :users, :merchant_name, :string
  end
end
