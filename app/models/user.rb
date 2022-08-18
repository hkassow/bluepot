class User < ApplicationRecord
    has_secure_password
    has_many :posts
    has_many :associated_tags, as: :imageable, dependent: :destroy
    has_many :comments, dependent: :destroy
    has_many :votes
    has_many :followers, foreign_key: :follower_id, class_name: 'Follow'
    has_many :followees, through: :followers
    has_many :followees, foreign_key: :followee_id, class_name: 'Follow'
    has_many :followers, through: :followees
    validates :username, uniqueness: true
    
    def following
        Follow.following(self)
    end
end
