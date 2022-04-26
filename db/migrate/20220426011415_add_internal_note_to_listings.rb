class AddInternalNoteToListings < ActiveRecord::Migration[5.2]
  def change
    add_column :listings, :internal_note, :string
  end
end
