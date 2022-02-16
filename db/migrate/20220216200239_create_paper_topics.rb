class CreatePaperTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :paper_topics do |t|
      t.belongs_to :paper, null: false
      t.belongs_to :topic, null: false

      t.timestamps
    end
  end
end
