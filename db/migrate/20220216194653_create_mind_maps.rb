class CreateMindMaps < ActiveRecord::Migration[7.0]
  def change
    create_table :mind_maps do |t|
      t.string :name, null: false, default: ''
      t.string :label, null: false, default: ''
      t.string :position, null: false, default: ''
      t.integer :hours, null: false, default: 0

      t.timestamps
    end
  end
end
