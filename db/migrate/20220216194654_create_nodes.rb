class CreateNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :nodes do |t|
      t.belongs_to :mind_map, null: true
      t.references :parent_node, null: true, foreign_key: { to_table: :nodes }
      t.string :name, null: false, default: ''
      t.string :label, null: false, default: ''
      t.string :colour, null: false, default: ''
      t.belongs_to :topic_area, null: true
      t.string :position, null: false, default: ''
      t.integer :hours, null: false, default: 0

      t.timestamps
    end
  end
end
