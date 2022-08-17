class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :video_url, :description, :rating
  has_one :user
  has_many :associated_tags
  has_many :comments
end
