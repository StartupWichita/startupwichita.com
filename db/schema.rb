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

ActiveRecord::Schema.define(version: 20171014222022) do

  create_table "companies", force: :cascade do |t|
    t.string   "name",        limit: 255
    t.string   "logo",        limit: 255
    t.string   "website",     limit: 255
    t.text     "description"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "events", force: :cascade do |t|
    t.datetime "starts_at"
    t.datetime "ends_at"
    t.string   "address",      limit: 255
    t.string   "image",        limit: 255
    t.integer  "image_width"
    t.integer  "image_height"
  end

  create_table "events_people", force: :cascade do |t|
    t.integer "event_id"
    t.integer "person_id"
  end

  create_table "friendly_id_slugs", force: :cascade do |t|
    t.string   "slug",           limit: 255, null: false
    t.integer  "sluggable_id",               null: false
    t.string   "sluggable_type", limit: 50
    t.string   "scope",          limit: 255
    t.datetime "created_at"
  end

  add_index "friendly_id_slugs", ["slug", "sluggable_type", "scope"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type_and_scope", unique: true
  add_index "friendly_id_slugs", ["slug", "sluggable_type"], name: "index_friendly_id_slugs_on_slug_and_sluggable_type"
  add_index "friendly_id_slugs", ["sluggable_id"], name: "index_friendly_id_slugs_on_sluggable_id"
  add_index "friendly_id_slugs", ["sluggable_type"], name: "index_friendly_id_slugs_on_sluggable_type"

  create_table "indications", force: :cascade do |t|
    t.integer  "questionable_id"
    t.string   "questionable_type", limit: 255
    t.integer  "user_id"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "news", force: :cascade do |t|
    t.string  "image",        limit: 255
    t.integer "image_width"
    t.integer "image_height"
  end

  create_table "news_people", force: :cascade do |t|
    t.integer "news_id"
    t.integer "person_id"
  end

  create_table "people", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "first_name",          limit: 255
    t.string   "last_name",           limit: 255
    t.string   "email",               limit: 255
    t.string   "phone",               limit: 255
    t.string   "website",             limit: 255
    t.string   "company_name",        limit: 255
    t.string   "title",               limit: 255
    t.string   "twitter_username",    limit: 255
    t.text     "bio"
    t.boolean  "featured",                        default: false
    t.string   "avatar_file_name",    limit: 255
    t.string   "avatar_content_type", limit: 255
    t.integer  "avatar_file_size"
    t.datetime "avatar_updated_at"
    t.string   "slug",                limit: 255
    t.boolean  "allow_contact",                   default: true
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "profile_score",                   default: 0,     null: false
  end

  add_index "people", ["featured"], name: "index_people_on_featured"
  add_index "people", ["profile_score"], name: "index_people_on_profile_score"
  add_index "people", ["slug"], name: "index_people_on_slug", unique: true
  add_index "people", ["user_id"], name: "index_people_on_user_id"

  create_table "person_emails", force: :cascade do |t|
    t.integer  "person_id"
    t.string   "recipient_email", limit: 255
    t.string   "sender_name",     limit: 255
    t.string   "sender_email",    limit: 255
    t.string   "sender_phone",    limit: 255
    t.text     "message"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "person_emails", ["person_id"], name: "index_person_emails_on_person_id"

  create_table "person_roles", force: :cascade do |t|
    t.string   "name",       limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  create_table "resources", force: :cascade do |t|
  end

  create_table "taggings", force: :cascade do |t|
    t.integer  "tag_id"
    t.integer  "taggable_id"
    t.string   "taggable_type", limit: 255
    t.integer  "tagger_id"
    t.string   "tagger_type",   limit: 255
    t.string   "context",       limit: 128
    t.datetime "created_at"
  end

  add_index "taggings", ["context"], name: "index_taggings_on_context"
  add_index "taggings", ["tag_id", "taggable_id", "taggable_type", "context", "tagger_id", "tagger_type"], name: "taggings_idx", unique: true
  add_index "taggings", ["taggable_id", "taggable_type", "context"], name: "index_taggings_on_taggable_id_and_taggable_type_and_context"

  create_table "tags", force: :cascade do |t|
    t.string  "name",           limit: 255
    t.integer "taggings_count",             default: 0
  end

  add_index "tags", ["name"], name: "index_tags_on_name", unique: true

  create_table "topics", force: :cascade do |t|
    t.integer  "user_id"
    t.string   "title",        limit: 255
    t.text     "content",      limit: 255
    t.string   "url",          limit: 255
    t.boolean  "spam"
    t.datetime "created_at"
    t.datetime "updated_at"
    t.integer  "actable_id"
    t.string   "actable_type", limit: 255
  end

  create_table "tuesday_readers", force: :cascade do |t|
    t.integer  "person_id"
    t.string   "email"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "tuesday_readers", ["person_id"], name: "index_tuesday_readers_on_person_id", unique: true

  create_table "users", force: :cascade do |t|
    t.string   "email",                  limit: 255, default: "",    null: false
    t.string   "encrypted_password",     limit: 255, default: "",    null: false
    t.string   "reset_password_token",   limit: 255
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.integer  "sign_in_count",                      default: 0,     null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.string   "current_sign_in_ip",     limit: 255
    t.string   "last_sign_in_ip",        limit: 255
    t.datetime "created_at"
    t.datetime "updated_at"
    t.boolean  "admin",                              default: false
    t.string   "provider",               limit: 255
    t.string   "uid",                    limit: 255
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["provider"], name: "index_users_on_provider"
  add_index "users", ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  add_index "users", ["uid"], name: "index_users_on_uid"

  create_table "votes", force: :cascade do |t|
    t.integer  "votable_id"
    t.string   "votable_type"
    t.integer  "voter_id"
    t.string   "voter_type"
    t.boolean  "vote_flag"
    t.string   "vote_scope"
    t.integer  "vote_weight"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "votes", ["votable_id", "votable_type", "vote_scope"], name: "index_votes_on_votable_id_and_votable_type_and_vote_scope"
  add_index "votes", ["voter_id", "voter_type", "vote_scope"], name: "index_votes_on_voter_id_and_voter_type_and_vote_scope"

end
