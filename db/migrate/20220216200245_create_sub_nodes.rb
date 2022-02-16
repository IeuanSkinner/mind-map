class CreateSubNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :sub_nodes do |t|
      t.references :parent_node, null: false, references: :nodes, foreign_key: { to_table: :nodes }
      t.references :sub_node, null: false, references: :nodes, foreign_key: { to_table: :nodes }

      t.timestamps
    end
  end
end
