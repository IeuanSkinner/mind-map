class Node < ApplicationRecord
  default_scope { order(id: :asc) }

  belongs_to :mind_map, optional: true
  belongs_to :parent_node, class_name: 'Node', optional: true
  has_many :child_nodes, class_name: 'Node', foreign_key: 'parent_node_id'
  belongs_to :topic_area, optional: true
  has_many :from_node_links, class_name: 'Link', foreign_key: 'to_node_id'
  has_many :to_node_links, class_name: 'Link', foreign_key: 'from_node_id'
  has_many :from_nodes, through: :from_node_links
  has_many :to_nodes, through: :to_node_links
  has_one :learning_objective
  has_many :resources

  validates :label, presence: true
  validates :hours, presence: true

  after_create :inherit_mind_map, :inherit_topic_area, :inherit_colour, :inherit_position
  after_save :set_colour, if: -> { saved_change_to_attribute?(topic_area) }

  def json
    {
      id: format_id,
      name: name || label,
      label: label,
      hours: hours,
      position: position,
      colour: colour,
      children: child_nodes.map(&:json)
    }
  end

  def format_id
    "node_#{id}"
  end

  private

  def set_colour
    update!(colour: topic_area.colour)
  end

  def inherit_mind_map
    inherit_prop('mind_map_id')
  end

  def inherit_topic_area
    inherit_prop('topic_area_id')

    set_colour if topic_area.present?
  end

  def inherit_colour
    inherit_prop('colour')
  end

  def inherit_position
    inherit_prop('position')
  end

  def inherit_prop(prop)
    return if self[prop].present?

    return unless parent_node.present?

    update!({ "#{prop}": parent_node[prop] })
  end
end
