class AssociatedTagSerializer < ActiveModel::Serializer
  attributes :id, :name
  belongs_to :tag

  def name
    name = Tag.find_by(id: object.tag_id).name
  end

end
