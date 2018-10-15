class EditListingsAddOverview < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :overview, :text, presence: true
  end
end
