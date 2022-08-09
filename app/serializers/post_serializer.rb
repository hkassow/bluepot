class PostSerializer < ActiveModel::Serializer
  attributes :id, :title, :description, :video, :user_id
end
