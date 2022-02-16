class Node < ApplicationRecord
  belongs_to :area, optional: true
  has_many :parent_node_links, class_name: 'SubNode', foreign_key: 'sub_node_id' # Where this node is the Sub Node the other node is the Parent Node.
  has_many :sub_node_links, class_name: 'SubNode', foreign_key: 'parent_node_id' # Where this node is the Parent Node the other node is the Sub Node.
  has_many :parent_nodes, through: :parent_node_links
  has_many :sub_nodes, through: :sub_node_links
  has_many :priori_nodes, class_name: 'Edge', foreign_key: 'dependant_node_id' # Where this node is the Dependant Node the other nodes are Priori Nodes.
  has_many :dependant_nodes, class_name: 'Edge', foreign_key: 'priori_node_id' # Where this node is the Priori Node the other nodes are Dependant Nodes.
  has_one :learning_objective
  has_many :resources

  validates :name, presence: true
  validates :hours, presence: true
end
