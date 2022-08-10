class Post < ApplicationRecord
    belongs_to :user
    has_many :associated_tags, as: :imageable, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :votes
    has_one_attached :image

    def rating
        self.votes.sum(:value)
    end
    def image_url
        Rails.application.routes.url_helpers.url_for(image) if image.attached?
    end
end
