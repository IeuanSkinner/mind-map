class Link < ApplicationRecord
  belongs_to :from_node, class_name: 'Node'
  belongs_to :to_node, class_name: 'Node'

  validates :from_node, presence: true
  validates :to_node, presence: true
  validates :label, presence: true

  after_create :set_colour

  def json
    {
      from_node_id: from_node.format_id,
      to_node_id: to_node.format_id,
      label: label,
      colour: colour
  }.to_json
  end

  private

  def set_colour
    update!(colour: from_node.colour)
  end
end
