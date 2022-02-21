class MindMap < ApplicationRecord
  has_many :branches

  validates :name, presence: true
  validates :label, presence: true
  validates :position, presence: true
  validates :hours, presence: true
end
