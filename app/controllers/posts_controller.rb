class PostsController < ApplicationController
    def create
        post = Post.create!(post_params)
        render json: post, status: :created, serializer: PostSerializer
    end
    def update
        post = Post.find(params[:id])
        post.update(post_params)
    end
    def show
        post = Post.find(params[:id])
        render json: post, serializer: PostSerializer
    end

    private 
    def post_params
        params.require(:post).permit(:title, :video, :user_id)
    end
end
