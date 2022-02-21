class Branch < ApplicationRecord
  belongs_to :mind_map, optional: true
  belongs_to :parent_branch, class_name: 'Branch', optional: true
  has_many :child_branches, class_name: 'Branch', foreign_key: 'parent_branch_id'
  belongs_to :topic_area, optional: true
  has_many :links
  has_many :from_branches, through: :links, foreign_key: 'to_branch_id'
  has_many :to_branches, through: :links, foreign_key: 'from_branch_id'
  has_one :learning_objective
  has_many :resources

  validates :label, presence: true
  validates :hours, presence: true

  after_create :inherit_mind_map, :inherit_topic_area, :inherit_colour, :inherit_position

  private

  def inherit_mind_map
    inherit_prop('mind_map_id')
  end

  def inherit_topic_area
    inherit_prop('topic_area_id')
  end

  def inherit_colour
    inherit_prop('colour')
  end

  def inherit_position
    inherit_prop('position')
  end

  def inherit_prop(prop)
    return if self[prop].present?

    return unless parent_branch.present?

    update!({ "#{prop}": parent_branch[prop] })
  end
end
