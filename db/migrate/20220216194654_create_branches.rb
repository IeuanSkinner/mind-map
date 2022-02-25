class CreateBranches < ActiveRecord::Migration[7.0]
  def change
    create_table :branches do |t|
      t.belongs_to :mind_map, null: true
      t.references :parent_branch, null: true, foreign_key: { to_table: :branches }
      t.string :name, null: false, default: ''
      t.string :label, null: false, default: ''
      t.string :colour, null: false, default: '#000'
      t.belongs_to :topic_area, null: true
      t.string :position, null: false, default: ''
      t.integer :hours, null: false, default: 0

      t.timestamps
    end
  end
end
