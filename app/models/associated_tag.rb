class AssociatedTag < ApplicationRecord
    belongs_to :tag
    belongs_to :imageable, polymorphic: true
    validate :tag_uniqueness

    def tag_uniqueness
        if (self.imageable.associated_tags.any?{|associated_tag| associated_tag.tag_id == self.tag_id}) 
            errors.add(:imageable, "tag already associated")
        end
    end
end
