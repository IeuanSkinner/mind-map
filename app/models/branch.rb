class Branch < ApplicationRecord
  belongs_to :mind_map
  has_one :parent_branch, optional: true, class_name: 'Branch', foreign_key: 'parent_branch_id'
  belongs_to :topic_area, optional: true
  has_many :links
  has_many :from_branches, through: :links, foreign_key: 'to_branch_id'
  has_many :to_branches, through: :links, foreign_key: 'from_branch_id'
  has_one :learning_objective
  has_many :resources

  validates :label, presence: true
  validates :position, presence: true
  validates :hours, presence: true
end
