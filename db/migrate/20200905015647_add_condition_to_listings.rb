class AddConditionToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :condition, :string, default: true
  end
end
