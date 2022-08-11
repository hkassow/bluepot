class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :video_url
end
