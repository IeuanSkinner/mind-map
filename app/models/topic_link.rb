class TopicLink < ApplicationRecord
  t.belongs_to :priori, class_name: 'Topic', 
  t.belongs_to :dependant, class_name: 'Topic'

  validates :priori, presence: true
  validates :dependant, presence: true
end
