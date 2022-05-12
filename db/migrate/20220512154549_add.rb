class Add < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :detailed_condition, :string
  end
end
