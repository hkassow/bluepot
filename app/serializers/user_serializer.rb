class UserSerializer < ActiveModel::Serializer
  attributes :username, :summoner_name, :id, :following
  has_many :associated_tags
end
