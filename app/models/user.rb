# == Schema Information
#
# Table name: users
#
#  id              :bigint(8)        not null, primary key
#  username        :string           not null
#  session_token   :string           not null
#  password_digest :string           not null
#  created_at      :datetime         not null
#  updated_at      :datetime         not null
#  merchant_name   :string
#

class User < ApplicationRecord

  validates :username, :session_token, :password_digest, presence: true
  validates :username, uniqueness: true
  validates :password,
            length: {
              minimum: 6,
              allow_nil: true,
              too_short: "must be at least 6 characters"
            }

  has_many :listings,
    primary_key: :id,
    foreign_key: :author_id,
    class_name: :Listing

  has_many :carts,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Cart

  # has_many :saved_listings,
  #   through: :carts,
  #   source: :listing

  has_many  :reviews,
    primary_key: :id,
    foreign_key: :user_id,
    class_name: :Review



  attr_reader :password

  after_initialize :ensure_session_token

  def self.find_by_credentials(username,password)
    user = User.find_by(username: username)

    user && user.is_password?(password) ? user : nil
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end


  def password=(password)
    @password = password

    self.password_digest = BCrypt::Password.create(password)

  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64

  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    self.save
    self.session_token
  end

end
