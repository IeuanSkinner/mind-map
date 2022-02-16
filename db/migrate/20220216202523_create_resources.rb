class CreateResources < ActiveRecord::Migration[7.0]
  def change
    create_table :resources do |t|
      t.belongs_to :topic, null: false
      t.string :type, null: false, default: ''
      t.json :data, null: false, default: {}

      t.timestamps
    end
  end
end
