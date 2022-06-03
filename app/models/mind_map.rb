class MindMap < ApplicationRecord
  has_many :branches

  validates :name, presence: true
  validates :label, presence: true
  validates :position, presence: true
  validates :hours, presence: true
  
  def to_json
    {
      name: name,
      label: label.split(','),
      position: position,
      hours: hours,
      children: branches.where(parent_branch_id: nil).map(&:json)
    }.to_json
  end
end
