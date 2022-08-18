class FollowsController < ApplicationController
    def create
        Follow.create(follower_id: params[:follower_id], followee_id: params[:followee_id])
    end
end
