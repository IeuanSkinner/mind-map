class SubTopic < ApplicationRecord
  t.belongs_to :parent_topic, class_name: 'Topic'
  t.belongs_to :sub_topic, class_name: 'Topic'

  validates :parent_topic, presence: true
  validates :sub_topic, presence: true
end
