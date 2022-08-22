class CommentSerializer < ActiveModel::Serializer
  attributes :id, :post_id, :text, :user_id, :associated_username, :post_name

  def associated_username
    object.user.username
  end
  def post_name
    object.post.title
  end
end
