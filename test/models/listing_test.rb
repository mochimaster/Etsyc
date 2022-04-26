# == Schema Information
#
# Table name: listings
#
#  id                 :bigint           not null, primary key
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
#  status             :boolean          default(TRUE)
#  condition          :string           default("new")
#  renewed_at         :datetime
#  brand              :string
#  internal_note      :string
#

require 'test_helper'

class ListingTest < ActiveSupport::TestCase
  # test "the truth" do
  #   assert true
  # end
end
