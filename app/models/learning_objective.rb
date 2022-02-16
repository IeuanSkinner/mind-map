class LearningObjective < ApplicationRecord
  belongs_to :topic

  validates :topic, presence: true
end
