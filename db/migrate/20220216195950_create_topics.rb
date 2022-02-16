class CreateTopics < ActiveRecord::Migration[7.0]
  def change
    create_table :topics do |t|
      t.string :name, null: false, default: ''
      t.string :colour, null: false, default: '#000'
      t.integer :hours, null: false, default: 0

      t.timestamps
    end
  end
end
