class TopicArea < ApplicationRecord
  has_many :branches
  has_many :links

  validates :name, presence: true
  validates :colour, presence: true

  def json
    {
      name: name,
      colour: colour
    }.to_json
  end
end
