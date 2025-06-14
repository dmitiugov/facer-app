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

ActiveRecord::Schema.define(version: 20170331122050) do

  create_table "accaunts", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "artists", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.string   "soundcloud"
    t.string   "wikipedia"
    t.string   "bandcamp"
    t.string   "facebook"
    t.string   "vk"
    t.string   "bio"
    t.datetime "created_at",         null: false
    t.datetime "updated_at",         null: false
    t.integer  "accaunt_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.datetime "photo_updated_at"
    t.string   "bc_embed"
  end

  add_index "artists", ["accaunt_id"], name: "index_artists_on_accaunt_id"

  create_table "comments", force: :cascade do |t|
    t.string   "body"
    t.integer  "upvotes"
    t.integer  "post_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id"
  add_index "comments", ["user_id"], name: "index_comments_on_user_id"

  create_table "events", force: :cascade do |t|
    t.string   "name"
    t.string   "description"
    t.datetime "created_at",                        null: false
    t.datetime "updated_at",                        null: false
    t.string   "date"
    t.string   "file_file_name"
    t.string   "file_content_type"
    t.integer  "file_file_size"
    t.datetime "file_updated_at"
    t.integer  "accaunt_id"
    t.boolean  "archive",           default: false
    t.integer  "user_id"
  end

  add_index "events", ["accaunt_id"], name: "index_events_on_accaunt_id"
  add_index "events", ["user_id"], name: "index_events_on_user_id"

  create_table "guests", force: :cascade do |t|
    t.integer  "event_id"
    t.string   "name"
    t.string   "surname"
    t.string   "bio"
    t.integer  "age"
    t.datetime "created_at",                 null: false
    t.datetime "updated_at",                 null: false
    t.boolean  "inside",     default: false
  end

  add_index "guests", ["event_id"], name: "index_guests_on_event_id"

  create_table "posts", force: :cascade do |t|
    t.string   "title"
    t.string   "link"
    t.integer  "upvotes"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "user_id"
  end

  add_index "posts", ["user_id"], name: "index_posts_on_user_id"

  create_table "shows", force: :cascade do |t|
    t.integer  "artist_id"
    t.integer  "event_id"
    t.string   "time_start"
    t.string   "time_end"
    t.datetime "created_at",                  null: false
    t.datetime "updated_at",                  null: false
    t.string   "artist_name"
    t.boolean  "on_stage",    default: false
  end

  add_index "shows", ["artist_id"], name: "index_shows_on_artist_id"
  add_index "shows", ["event_id"], name: "index_shows_on_event_id"

  create_table "special_guests", force: :cascade do |t|
    t.string   "name"
    t.string   "surname"
    t.string   "bio"
    t.string   "description"
    t.integer  "age"
    t.datetime "created_at",                              null: false
    t.datetime "updated_at",                              null: false
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.integer  "accaunt_id"
    t.string   "guest_type",          default: "special"
  end

  add_index "special_guests", ["accaunt_id"], name: "index_special_guests_on_accaunt_id"

  create_table "users", force: :cascade do |t|
    t.string   "email",                  default: "", null: false
    t.string   "encrypted_password",     default: "", null: false
    t.string   "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",          default: 0,  null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip"
    t.string   "last_sign_in_ip"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "username"
    t.integer  "accaunt_id"
    t.string   "name"
    t.string   "surname"
    t.integer  "age"
    t.string   "avatar_file_name"
    t.string   "avatar_content_type"
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
  end

  add_index "users", ["accaunt_id"], name: "index_users_on_accaunt_id"
  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

  create_table "visits", force: :cascade do |t|
    t.integer  "special_guest_id"
    t.integer  "event_id"
    t.string   "time_start"
    t.string   "time_end"
    t.datetime "created_at",                       null: false
    t.datetime "updated_at",                       null: false
    t.boolean  "inside",           default: false
  end

  add_index "visits", ["event_id"], name: "index_visits_on_event_id"
  add_index "visits", ["special_guest_id"], name: "index_visits_on_special_guest_id"

end
