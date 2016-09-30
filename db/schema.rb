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

ActiveRecord::Schema.define(version: 20160928005200) do

  create_table "events", force: true do |t|
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.string   "address",   limit: nil
  end

  create_table "friendly_id_slugs", force: true do |t|
    t.string   "slug",           limit: nil, null: false
    t.integer  "sluggable_id",               null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope",          limit: nil
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"

  create_table "news", force: true do |t|
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "people", force: true do |t|
    t.integer  "user_id"
    t.string   "first_name",          limit: nil
    t.string   "last_name",           limit: nil
    t.string   "email",               limit: nil
    t.string   "phone",               limit: nil
    t.string   "website",             limit: nil
    t.string   "company_name",        limit: nil
    t.string   "title",               limit: nil
    t.string   "twitter_username",    limit: nil
    t.text     "bio"
    t.boolean  "featured",                        default: false
    t.string   "avatar_file_name",    limit: nil
    t.string   "avatar_content_type", limit: nil
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "slug",                limit: nil
    t.boolean  "allow_contact",                   default: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "profile_score",                   default: 0,     null: false
  end

  add_index "people", ["profile_score"], name: "index_people_on_profile_score"
  add_index "people", ["slug"], name: "index_people_on_slug", unique: true
  add_index "people", ["user_id"], name: "index_people_on_user_id"

  create_table "person_emails", force: true do |t|
    t.integer  "person_id"
    t.string   "recipient_email", limit: nil
    t.string   "sender_name",     limit: nil
    t.string   "sender_email",    limit: nil
    t.string   "sender_phone",    limit: nil
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "person_emails", ["person_id"], name: "index_person_emails_on_person_id"

  create_table "person_roles", force: true do |t|
    t.string   "name",       limit: nil
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "resources", force: true do |t|
  end

  create_table "taggings", force: true do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type", limit: nil
    t.integer  "tagger_id"
    t.string   "tagger_type",   limit: nil
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"

  create_table "tags", force: true do |t|
    t.string  "name",           limit: nil
    t.integer "taggings_count",             default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true

  create_table "topics", force: true do |t|
    t.integer  "user_id"
    t.string   "title"
    t.text     "content",      limit: 255
    t.string   "url"
    t.boolean  "spam"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "actable_id"
    t.string   "actable_type"
  end

  create_table "users", force: true do |t|
    t.string   "email",                  limit: nil, default: "",    null: false
    t.string   "encrypted_password",     limit: nil, default: "",    null: false
    t.string   "reset_password_token",   limit: nil
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                      default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: nil
    t.string   "last_sign_in_ip",        limit: nil
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                              default: false
    t.string   "provider",               limit: nil
    t.string   "uid",                    limit: nil
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["provider"], name: "index_users_on_provider"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["uid"], name: "index_users_on_uid"

end
