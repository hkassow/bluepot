class Follow < ApplicationRecord
    belongs_to :follower, class_name: 'User'
    belongs_to :followee, class_name: 'User'

    def self.following (user)
        select { |follow| follow.followee == user}.map {|follow| follow.follower}
    end
end
