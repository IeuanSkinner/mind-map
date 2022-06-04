class MindMap < ApplicationRecord
  has_many :branches

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
      children: branches.where(parent_branch_id: nil).map(&:json)
    }.to_json
  end 
end
