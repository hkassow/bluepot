class PostsController < ApplicationController
    def show
        post = Post.find(params[:id])
        render json: post
    end
    def create
        post = Post.create!(post_params)
        tags = params["post"]["tags"].split(',').map{|tag| Tag.find_by(name: tag)}
        tags.each{|tag| AssociatedTag.create!(imageable: post, tag: tag)}
        debugger
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
        params.require(:post).permit(:title, :video, :user_id, :description)
    end
end
