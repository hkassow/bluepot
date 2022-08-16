class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :video_url
  has_one :user
end
