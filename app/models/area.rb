class Area < ApplicationRecord
  has_many :nodes, class_name: 'Node', foreign_key: 'area_id'
  has_many :edges

  validates :name, presence: true
  validates :colour, presence: true
end
