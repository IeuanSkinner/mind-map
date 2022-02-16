# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2022_02_16_202523) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "areas", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "colour", default: "#000", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "edges", force: :cascade do |t|
    t.bigint "area_id", null: false
    t.bigint "priori_node_id", null: false
    t.bigint "dependant_node_id", null: false
    t.string "label", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_edges_on_area_id"
    t.index ["dependant_node_id"], name: "index_edges_on_dependant_node_id"
    t.index ["priori_node_id"], name: "index_edges_on_priori_node_id"
  end

  create_table "learning_objectives", force: :cascade do |t|
    t.bigint "node_id", null: false
    t.text "text", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_learning_objectives_on_node_id"
  end

  create_table "nodes", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.bigint "area_id"
    t.integer "hours", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_nodes_on_area_id"
  end

  create_table "resources", force: :cascade do |t|
    t.bigint "topic_id", null: false
    t.string "type", default: "", null: false
    t.json "data", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["topic_id"], name: "index_resources_on_topic_id"
  end

  create_table "sub_nodes", force: :cascade do |t|
    t.bigint "parent_node_id", null: false
    t.bigint "sub_node_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_node_id"], name: "index_sub_nodes_on_parent_node_id"
    t.index ["sub_node_id"], name: "index_sub_nodes_on_sub_node_id"
  end

  add_foreign_key "edges", "nodes", column: "dependant_node_id"
  add_foreign_key "edges", "nodes", column: "priori_node_id"
  add_foreign_key "sub_nodes", "nodes", column: "parent_node_id"
  add_foreign_key "sub_nodes", "nodes", column: "sub_node_id"
end
