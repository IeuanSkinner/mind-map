class Area < ApplicationRecord
  has_many :papers

  validates :name, presence: true
  validates :colour, presence: true
end
