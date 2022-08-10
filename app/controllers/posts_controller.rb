class PostsController < ApplicationController
    def create
        @post = Post.create!(post_params)
        render json: @post, status: :created, serializer: PostSerializer
    end
    def show
        post = Post.find(params[:id])
        render json: post, serializer: PostSerializer
    end

    private 
    def post_params
        params.require(:post).permit(:title, :image, :user_id)
    end
end
