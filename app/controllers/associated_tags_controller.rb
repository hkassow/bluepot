class AssociatedTagsController < ApplicationController
    def create
        user = User.find(params[:user_id])
        associated_tag = AssociatedTag.create!(imageable: user, tag_id: params[:tag_id])
        tags = AssociatedTag.where(imageable: user)
        render json: tags, status: :created
    end
    def destroy
        associated_tag = AssociatedTag.find(params[:id])
        user = associated_tag.imageable
        associated_tag.destroy
        render json: user.associated_tags
    end
end
