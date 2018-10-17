# == Schema Information
#
# Table name: carts
#
#  id         :bigint(8)        not null, primary key
#  quantity   :integer          not null
#  listing_id :integer          not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Cart < ApplicationRecord

  validates :quantity, :listing_id, :user_id, presence: true

  belongs_to :listing,
    primary_key: :id,
    foreign_key: :listing_id,
    class_name: :Listing

  belongs_to :user,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :User

  

end
