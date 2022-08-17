class CommentSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :text, :user_id, :associated_username

  def associated_username
    object.user.username
  end
end
