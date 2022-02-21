class CreateTopicAreas < ActiveRecord::Migration[7.0]
  def change
    create_table :topic_areas do |t|
      t.string :name, null: false, default: ''
      t.string :colour, null: false, default: '#000'

      t.timestamps
    end
  end
end
