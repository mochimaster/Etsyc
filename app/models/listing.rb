# == Schema Information
#
# Table name: listings
#
#  id                 :bigint(8)        not null, primary key
#  title              :string           not null
#  description        :text             not null
#  category           :string
#  author_id          :integer          not null
#  modified_by_userid :integer
#  created_at         :datetime         not null
#  updated_at         :datetime         not null
#  price              :float
#  overview           :text
#  merchant_name      :string
#

class Listing < ApplicationRecord
  validates :description, :author_id, :price, :overview,presence: true
  validates :title, uniqueness: true
  validates :price, numericality: { greater_than: 0}
  attribute :modified_by_userid, :integer, default: :author_id

  has_many_attached :photos # to support multiple picture upload
  has_one_attached :photo # to support previous single upload


  belongs_to :author,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

  has_many :carts,
    primary_key: :id,
    foreign_key: :listing_id,
    class_name: :Cart

  has_many :saved_listings,
    through: :carts,
    source: :listing

  has_many :reviews,
    primary_key: :id,
    foreign_key: :listing_id,
    class_name: :Review


  def title_validation
    if title.length >= 255
      errors[:title] << "Title is too long."
    end
  end

  def description_validation
    if description.length <= 1
      errors[:description] << "Description cannot be empty."
    end
  end

  def self.search_result(query_params)
    # debugger
    return Listing.all if query_params == ""

    # add SQL wildcard
    query_params = '%'+query_params+'%'

    @listings_title = Listing.where('LOWER(title) LIKE LOWER(?)', query_params)
    @listings_merchant_name = Listing.where('LOWER(merchant_name) LIKE LOWER(?)', query_params)

    return @listings_title + @listings_merchant_name
  end


end
