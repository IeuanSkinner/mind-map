class MindMap < ApplicationRecord
  has_many :nodes

  validates :name, presence: true
  validates :label, presence: true
  validates :position, presence: true
  validates :hours, presence: true
  
  def json
    {
      id: "mind_map_#{id}",
      name: name,
      label: label,
      position: position,
      hours: hours,
      children: nodes.where(parent_node_id: nil).map(&:json)
    }.to_json
  end 
end
