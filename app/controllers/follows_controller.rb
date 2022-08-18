class FollowsController < ApplicationController
    def create
        Follow.create(follower_id: params[:follower_id], followee_id: params[:followee_id])
    end
    def destroy
        follow = Follow.find_by(follower_id: params[:follower_id], followee_id: params[:followee_id])
        follow.destroy
    end
end
