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

  create_table "learning_objectives", force: :cascade do |t|
    t.bigint "node_id", null: false
    t.text "text", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_learning_objectives_on_node_id"
  end

  create_table "links", force: :cascade do |t|
    t.bigint "topic_area_id"
    t.bigint "from_node_id", null: false
    t.bigint "to_node_id", null: false
    t.string "label", default: "", null: false
    t.string "colour", default: "#000000", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["from_node_id"], name: "index_links_on_from_node_id"
    t.index ["to_node_id"], name: "index_links_on_to_node_id"
    t.index ["topic_area_id"], name: "index_links_on_topic_area_id"
  end

  create_table "mind_maps", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "label", default: "", null: false
    t.string "position", default: "", null: false
    t.integer "hours", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "nodes", force: :cascade do |t|
    t.bigint "mind_map_id"
    t.bigint "parent_node_id"
    t.string "name", default: "", null: false
    t.string "label", default: "", null: false
    t.string "colour", default: "", null: false
    t.bigint "topic_area_id"
    t.string "position", default: "", null: false
    t.integer "hours", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["mind_map_id"], name: "index_nodes_on_mind_map_id"
    t.index ["parent_node_id"], name: "index_nodes_on_parent_node_id"
    t.index ["topic_area_id"], name: "index_nodes_on_topic_area_id"
  end

  create_table "resources", force: :cascade do |t|
    t.bigint "node_id", null: false
    t.string "type", default: "", null: false
    t.json "data", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["node_id"], name: "index_resources_on_node_id"
  end

  create_table "topic_areas", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "colour", default: "#000", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "links", "nodes", column: "from_node_id"
  add_foreign_key "links", "nodes", column: "to_node_id"
  add_foreign_key "nodes", "nodes", column: "parent_node_id"
end
