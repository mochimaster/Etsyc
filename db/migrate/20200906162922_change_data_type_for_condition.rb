class ChangeDataTypeForCondition < ActiveRecord::Migration[5.2]
  def change
    change_column :listings, :condition, :string, default: 'new'
  end
end
