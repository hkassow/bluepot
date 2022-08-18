class AssociatedTagsController < ApplicationController
    def create
        user = User.find(params[:user_id])
        associated_tag = AssociatedTag.create!(imageable: user, tag_id: params[:tag_id])
        render json: user.associated_tags, status: :created
    end
    def destroy
        associated_tag = AssociatedTag.find(params[:id])
        associated_tag.destroy
    end
end
