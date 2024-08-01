class Client < ApplicationRecord
  has_secure_password
  has_many :simulations, dependent: :destroy

  validates :name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :password, presence: true
end
