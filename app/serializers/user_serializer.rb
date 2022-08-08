class UserSerializer < ActiveModel::Serializer
  attributes :id, :username, :password_digest, :summoner_name
end
