class SubNode < ApplicationRecord
  belongs_to :parent_node, class_name: 'Node'
  belongs_to :sub_node, class_name: 'Node'

  validates :parent_node, presence: true
  validates :sub_node, presence: true
end
