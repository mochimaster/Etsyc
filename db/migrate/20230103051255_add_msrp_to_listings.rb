class AddMsrpToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :msrp, :float
  end
end
