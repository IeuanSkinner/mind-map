class CreateNodes < ActiveRecord::Migration[7.0]
  def change
    create_table :nodes do |t|
      t.string :name, null: false, default: ''
      t.belongs_to :area
      t.integer :hours, null: false, default: 0

      t.timestamps
    end
  end
end
