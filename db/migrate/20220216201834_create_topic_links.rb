class CreateTopicLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :topic_links do |t|
      t.references :priori, null: false, references: :topics, foreign_key: { to_table: :topics }
      t.references :dependant, null: false, references: :topics, foreign_key: { to_table: :topics }
      t.string :label, null: false, default: ''
      t.string :colour, null: false, default: '#000'

      t.timestamps
    end
  end
end
