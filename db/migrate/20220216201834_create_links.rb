class CreateLinks < ActiveRecord::Migration[7.0]
  def change
    create_table :links do |t|
      t.belongs_to :topic_area, null: true
      t.references :from_branch, null: false, foreign_key: { to_table: :branches }
      t.references :to_branch, null: false, foreign_key: { to_table: :branches }
      t.string :label, null: false, default: ''
      t.string :colour, null: false, default: '#000000'

      t.timestamps
    end
  end
end
