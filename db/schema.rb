# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20140926233655) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "notebooks", force: true do |t|
    t.string   "title",                   null: false
    t.integer  "user_id",                 null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "notes_count", default: 0
  end

  add_index "notebooks", ["user_id"], name: "index_notebooks_on_user_id", using: :btree

  create_table "notes", force: true do |t|
    t.string   "title",       null: false
    t.text     "contents"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",     null: false
    t.integer  "notebook_id"
  end

  add_index "notes", ["notebook_id"], name: "index_notes_on_notebook_id", using: :btree
  add_index "notes", ["user_id"], name: "index_notes_on_user_id", using: :btree

  create_table "tag_assignments", force: true do |t|
    t.integer "tag_id",  null: false
    t.integer "note_id", null: false
  end

  add_index "tag_assignments", ["note_id"], name: "index_tag_assignments_on_note_id", using: :btree
  add_index "tag_assignments", ["tag_id", "note_id"], name: "index_tag_assignments_on_tag_id_and_note_id", unique: true, using: :btree
  add_index "tag_assignments", ["tag_id"], name: "index_tag_assignments_on_tag_id", using: :btree

  create_table "tags", force: true do |t|
    t.string   "name",                    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "user_id",                 null: false
    t.integer  "notes_count", default: 0
  end

  add_index "tags", ["user_id", "name"], name: "index_tags_on_user_id_and_name", unique: true, using: :btree
  add_index "tags", ["user_id"], name: "index_tags_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "users", ["username"], name: "index_users_on_username", unique: true, using: :btree

end
