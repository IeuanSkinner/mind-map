class CreateEdges < ActiveRecord::Migration[7.0]
  def change
    create_table :edges do |t|
      t.belongs_to :area, null: false
      t.references :priori_node, null: false, references: :nodes, foreign_key: { to_table: :nodes }
      t.references :dependant_node, null: false, references: :nodes, foreign_key: { to_table: :nodes }
      t.string :label, null: false, default: ''

      t.timestamps
    end
  end
end
