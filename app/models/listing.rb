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

  # scope :with_eager_loaded_photo, -> { eager_load(photo: :blob) }
  # scope :with_preloaded_photo, -> { preload(photo: :blob) }

  scope :with_eager_loaded_photos, -> { eager_load(photos: :blob) }
  scope :with_preloaded_photos, -> { preload(photos: :blob) }

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

  self.per_page = 3

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
    return Listing.all if query_params == ""

    # add SQL wildcard
    # query_params = '%'+query_params+'%'

    words = query_params.split
    myarray_with_percentage_signs = words.map {|word| "%#{word}%"}
    @listings_title = Listing.where("title ILIKE ALL (array[?])", myarray_with_percentage_signs )

    # @listings_title = Listing.where('LOWER(title) LIKE LOWER(?)', query_params)
    @listings_merchant_name = Listing.where('LOWER(merchant_name) LIKE LOWER(?)', myarray_with_percentage_signs)
    # @listings_merchant_name = Listing.where('merchant_name ILIKE LOWER(?)', myarray_with_percentage_signs)

    # return @listings_title + @listings_merchant_name
    return @listings_title + @listings_merchant_name
  end


end
