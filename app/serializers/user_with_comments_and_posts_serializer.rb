class UserWithCommentsAndPostsSerializer < ActiveModel::Serializer
  attributes :id, :username
  has_many :posts
  has_many :comments
end
