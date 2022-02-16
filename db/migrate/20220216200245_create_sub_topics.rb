class CreateSubTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :sub_topics do |t|
      t.references :parent_topic, null: false, references: :topics, foreign_key: { to_table: :topics }
      t.references :sub_topic, null: false, references: :topics, foreign_key: { to_table: :topics }

      t.timestamps
    end
  end
end
