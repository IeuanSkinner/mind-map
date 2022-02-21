class TopicArea < ApplicationRecord
  has_many :branches
  has_many :links

  validates :name, presence: true
  validates :colour, presence: true
end
