class VoteSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :post_id, :value, :rating

  def rating
    object.post.rating
  end
end
