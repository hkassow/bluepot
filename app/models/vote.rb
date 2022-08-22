class Vote < ApplicationRecord
    belongs_to :user
    belongs_to :post
    validates :post, uniqueness: {scope: :user}
    validates :value, numericality: { in: -1..1 }
end
