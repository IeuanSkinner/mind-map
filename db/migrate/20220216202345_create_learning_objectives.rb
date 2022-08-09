class CreateLearningObjectives < ActiveRecord::Migration[7.0]
  def change
    create_table :learning_objectives do |t|
      t.belongs_to :node, null: false
      t.text :text, null: false, default: ''

      t.timestamps
    end
  end
end
