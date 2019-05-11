# == Schema Information
#
# Table name: categories
#
#  id         :bigint(8)        not null, primary key
#  listing_id :integer
#  category   :integer
#

class Category < ApplicationRecord

    validates :listing_id, :category, presence: true

    belongs_to :listing,
        primary_key: :id,
        foreign_key: :listing_id,
        class_name: :Listing

    self.per_page = 3
        
end
