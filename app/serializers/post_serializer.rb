class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :user_id, :image_url
end
