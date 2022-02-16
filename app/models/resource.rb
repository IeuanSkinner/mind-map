class Resource < ApplicationRecord
  belongs_to :node

  validates :node, presence: true
end
