class Link < ApplicationRecord
  belongs_to :from_branch, class_name: 'Branch'
  belongs_to :to_branch, class_name: 'Branch'

  validates :from_branch, presence: true
  validates :to_branch, presence: true

  after_create :set_colour

  private

  def set_colour
    update!(colour: from_branch.colour)
  end
end
