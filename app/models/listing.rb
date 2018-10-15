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
#

class Listing < ApplicationRecord
  validates :title, :description, :author_id, :price, :overview,presence: true
  validates :title, uniqueness: true
  validates :price, numericality: { greater_than: 0}
  attribute :modified_by_userid, :integer, default: :author_id

  has_one_attached :photo

  belongs_to :user,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :User

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



end
