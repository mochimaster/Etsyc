class AddDefaultValueToStatusAttribute < ActiveRecord::Migration[5.2]
  def change
    change_column_default :listings, :status, from: nil, to: true
  end
end
