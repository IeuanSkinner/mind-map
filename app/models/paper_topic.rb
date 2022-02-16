class PaperTopic < ApplicationRecord
  belongs_to :paper
  belongs_to :topic

  validates :paper, presence: true
  validates :topic, presence: true
end
