class CreateAssociatedTags < ActiveRecord::Migration[7.0]
  def change
    create_table :associated_tags do |t|
      t.integer :tag_id
      t.references :imageable, polymorphic: true
      t.timestamps
    end
  end
end
