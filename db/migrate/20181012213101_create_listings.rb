class CreateListings < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.string :title, null: false
      t.text :description, null: false
      t.string :category
      t.integer :author_id, null: false
      t.integer :modified_by_userid

      t.timestamps
    end
    add_index :listings, :title, unique: true

  end
end
