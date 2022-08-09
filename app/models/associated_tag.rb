class AssociatedTag < ApplicationRecord
    belongs_to :tag
    belongs_to :imageable, polymorphic: true
end
