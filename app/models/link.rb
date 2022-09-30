class Link < ApplicationRecord
  belongs_to :from_node, class_name: 'Node'
  belongs_to :to_node, class_name: 'Node'
  belongs_to :topic_area, optional: true

  validates :from_node, presence: true
  validates :to_node, presence: true
  validates :label, presence: true

  after_create :set_topic_area, :set_colour

  def json
    {
      from_node_id: from_node.format_id,
      to_node_id: to_node.format_id,
      label: label,
      colour: colour
  }.to_json
  end

  private

  def set_topic_area
    return unless from_node.topic_area.present?

    update!(topic_area: from_node.topic_area)
  end

  def set_colour
    return unless topic_area.present?

    update!(colour: topic_area.colour)
  end
end
