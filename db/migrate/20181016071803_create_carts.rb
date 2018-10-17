class CreateCarts < ActiveRecord::Migration[5.2]
  def change
    create_table :carts do |t|
      t.integer :quantity, null: false
      t.integer :listing_id, null: false
      t.integer :user_id, null: false

      t.timestamps
    end
    add_index :carts, :listing_id
    add_index :carts, :user_id
  end
end
