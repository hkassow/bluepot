class CommentsController < ApplicationController
    def show
        comment = Comment.find(params[:id])
        render json: comment
    end
    def create
        comment = Comment.create!(comment_params)
        render json: comment, status: :created
    end
    def update
        comment = Comment.find(params[:id])
        comment.update(comment_params)
        render json: comment, status: :ok
    end
    def destroy
        comment = Comment.find(params[:id])
        comment.destroy
    end
    private 
    def comment_params
        params.permit(:user_id, :post_id, :text)
    end
end
