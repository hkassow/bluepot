class Post < ApplicationRecord
    belongs_to :user
    has_many :associated_tags, as: :imageable, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :votes

    def rating
        self.votes.sum(:value)
    end
end
