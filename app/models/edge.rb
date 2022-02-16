class Edge < ApplicationRecord
  :priori_node, class_name: 'Node', 
  :dependant_node, class_name: 'Node'

  validates :priori_node, presence: true
  validates :dependant_node, presence: true
end
