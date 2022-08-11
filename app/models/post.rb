class Post < ApplicationRecord
    belongs_to :user
    has_many :associated_tags, as: :imageable, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :votes
    has_one_attached :video

    def rating
        self.votes.sum(:value)
    end
    def video_url
        Rails.application.routes.url_helpers.url_for(video) if video.attached?
    end
end
