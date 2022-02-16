class CreatePapers < ActiveRecord::Migration[7.0]
  def change
    create_table :papers do |t|
      t.belongs_to :level, null: false
      t.belongs_to :area, null: false
      t.string :name, null: false, default: ''
      t.string :colour, null: false, default: '#000'
      t.integer :total_hours, null: false, default: 0

      t.timestamps
    end
  end
end
