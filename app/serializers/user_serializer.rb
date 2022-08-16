class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :summoner_name
  has_many :associated_tags
end
