class Link < ApplicationRecord
  has_one :from_branch, class_name: 'Branch'
  has_one :to_branch, class_name: 'Branch'

  validates :from_branch, presence: true
  validates :to_branch, presence: true
end
