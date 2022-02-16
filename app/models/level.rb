class Level < ApplicationRecord
  has_many :papers

  validates :name, presence: true
end
