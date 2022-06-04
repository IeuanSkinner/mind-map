class Link < ApplicationRecord
  belongs_to :from_branch, class_name: 'Branch'
  belongs_to :to_branch, class_name: 'Branch'

  validates :from_branch, presence: true
  validates :to_branch, presence: true
  validates :label, presence: true

  after_create :set_colour

  def json
    {
      from_branch_id: from_branch.format_id,
      to_branch_id: to_branch.format_id,
      label: label,
      colour: colour
    }.to_json
  end

  private

  def set_colour
    puts from_branch.colour

    update!(colour: from_branch.colour)
  end
end
