class PostsController < ApplicationController
    def index
        posts = Post.all.order(created_at: :desc)
        render json: posts
    end
    def show
        find_post
        render json: @post
    end
    def show_top_rated
        hash = Vote.select(:value, :post_id).group(:post_id).order('sum_value DESC').limit(3).sum(:value)
        top_posts = []
        hash.each_key{|id| top_posts.push(Post.find(id))}
        render json: top_posts
    end
    def create
        post = Post.create!(post_params)
        tags = params["post"]["tags"].split(',').map{|tag| Tag.find_by(name: tag)}
        tags.each{|tag| AssociatedTag.create!(imageable: post, tag: tag)}
        render json: post, status: :created, serializer: PostSerializer
    end
    def update
        find_post
        @post.update(post_params)
        render json: post, status: :ok
    end
    def destroy
        find_post
        @post.destroy       
    end

    private 
    def find_post
        @post = Post.find(params[:id])
    end
    def post_params
        params.require(:post).permit(:title, :video, :user_id, :description)
    end
end
