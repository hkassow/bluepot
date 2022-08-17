class UserSerializer < ActiveModel::Serializer
  attributes :username, :summoner_name, :id
  has_many :associated_tags
end
