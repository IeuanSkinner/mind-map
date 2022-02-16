class LevelTopic < ApplicationRecord
  belongs_to :Level
  belongs_to :topic

  validates :level, presence: true
  validates :topic, presence: true
end
