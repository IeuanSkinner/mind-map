class Paper < ApplicationRecord
  belongs_to :level
  belongs_to :area

  validates :name, presence: true
  validates :color, presence: true
  validates :total_hours, presence: true
end
