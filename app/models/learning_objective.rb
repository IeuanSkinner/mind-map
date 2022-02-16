class LearningObjective < ApplicationRecord
  belongs_to :node

  validates :node, presence: true
  validates :text, presence: true
end
