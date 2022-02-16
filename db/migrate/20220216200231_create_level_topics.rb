class CreateLevelTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :level_topics do |t|
      t.belongs_to :level, null: false
      t.belongs_to :topic, null: false

      t.timestamps
    end
  end
end
