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

  create_table "learning_objectives", force: :cascade do |t|
    t.bigint "topic_id", null: false
    t.text "text", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["topic_id"], name: "index_learning_objectives_on_topic_id"
  end

  create_table "level_topics", force: :cascade do |t|
    t.bigint "level_id", null: false
    t.bigint "topic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["level_id"], name: "index_level_topics_on_level_id"
    t.index ["topic_id"], name: "index_level_topics_on_topic_id"
  end

  create_table "levels", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "paper_topics", force: :cascade do |t|
    t.bigint "paper_id", null: false
    t.bigint "topic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["paper_id"], name: "index_paper_topics_on_paper_id"
    t.index ["topic_id"], name: "index_paper_topics_on_topic_id"
  end

  create_table "papers", force: :cascade do |t|
    t.bigint "level_id", null: false
    t.bigint "area_id", null: false
    t.string "name", default: "", null: false
    t.string "colour", default: "#000", null: false
    t.integer "total_hours", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["area_id"], name: "index_papers_on_area_id"
    t.index ["level_id"], name: "index_papers_on_level_id"
  end

  create_table "resources", force: :cascade do |t|
    t.bigint "topic_id", null: false
    t.string "type", default: "", null: false
    t.json "data", default: {}, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["topic_id"], name: "index_resources_on_topic_id"
  end

  create_table "sub_topics", force: :cascade do |t|
    t.bigint "parent_topic_id", null: false
    t.bigint "sub_topic_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_topic_id"], name: "index_sub_topics_on_parent_topic_id"
    t.index ["sub_topic_id"], name: "index_sub_topics_on_sub_topic_id"
  end

  create_table "topic_links", force: :cascade do |t|
    t.bigint "priori_id", null: false
    t.bigint "dependant_id", null: false
    t.string "label", default: "", null: false
    t.string "colour", default: "#000", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dependant_id"], name: "index_topic_links_on_dependant_id"
    t.index ["priori_id"], name: "index_topic_links_on_priori_id"
  end

  create_table "topics", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "colour", default: "#000", null: false
    t.integer "hours", default: 0, null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "sub_topics", "topics", column: "parent_topic_id"
  add_foreign_key "sub_topics", "topics", column: "sub_topic_id"
  add_foreign_key "topic_links", "topics", column: "dependant_id"
  add_foreign_key "topic_links", "topics", column: "priori_id"
end
