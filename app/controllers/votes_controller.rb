class VotesController < ApplicationController
    def index
        vote = Vote.find_by(user_id: params[:user_id], post_id: params[:post_id])
        render json: vote unless vote.nil?
    end
    def destroy
        vote = Vote.find(params[:id])
        vote.destroy
        post = Post.find(vote.post_id)
        render json: post.rating
    end
    def create
        vote = Vote.create!(vote_params)
        render json: vote
    end
    def update
        vote = Vote.find(params[:id])
        vote.update(value: params[:value])
        render json: vote
    end

    private 
    def vote_params
        params.permit(:value, :user_id, :post_id)
    end
end
