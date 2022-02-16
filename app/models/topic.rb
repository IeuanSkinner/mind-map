class Topic < ApplicationRecord
  has_one :level_topic
  has_one :paper_topic
  has_one :level, through: :level_topic
  has_one :paper, through: :paper_topic
  has_one :area, through: :paper
  has_many :parent_topics, class_name: 'SubTopic', foreign_key: 'sub_topic_id'
  has_many :sub_topics, class_name: 'SubTopic', foreign_key: 'parent_topic_id'
  has_many :prioris, class_name: 'TopicLink', foreign_key: 'dependant_id'
  has_many :dependants, class_name: 'TopicLink', foreign_key: 'priori_id'
  has_one :learning_objective
  has_many :resources

  validates :name, presence: true
  validates :colour, presence: true
  validates :hours, presence: true
end
