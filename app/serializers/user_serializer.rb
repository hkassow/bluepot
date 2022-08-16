class UserSerializer < ActiveModel::Serializer
  attributes :username, :summoner_name
  has_many :associated_tags
end
