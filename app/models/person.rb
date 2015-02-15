class Person < ActiveRecord::Base
  extend FriendlyId
  friendly_id :full_name, use: :slugged

  acts_as_ordered_taggable_on :skills, :interests, :roles

  attr_accessor :role_list_tags

  # this user relationship is optional (admins can edit people, and so can users who are attached to people)  
  belongs_to :user 

  # Results in the following colums
  #   avatar_file_name
  #   avatar_content_type
  #   avatar_file_size
  #   avatar_updated_at
  #
  #   Accessible in templates via
  #     person.avatar.url - orig size
  #     person.avatar.url(:thumb)
  #     person.avatar.url(:square)
  #     person.avatar.url(:medium)
  #
  has_attached_file :avatar, styles: {
    thumb: '100x100>',
    square: '200x200#',
    medium: '300x300>'
  }
  do_not_validate_attachment_file_type :avatar

  before_validation :assign_role_list

  def self.all_skill_tags
    ActsAsTaggableOn::Tagging.all.where(context: "skills").map {|tagging| { "id" => "#{tagging.tag.id}", "name" => tagging.tag.name, "tagging_count" => tagging.tag.taggings_count } }.select{|t| t['tagging_count'] > 1}.uniq
  end

  def self.all_interest_tags
    ActsAsTaggableOn::Tagging.all.where(context: "interests").map {|tagging| { "id" => "#{tagging.tag.id}", "name" => tagging.tag.name, "tagging_count" => tagging.tag.taggings_count } }.select{|t| t['tagging_count'] > 1}.uniq
  end

  def self.all_person_role_tags
    PersonRole.all.map {|role| { "id" => "#{role.id}", "name" => role.name } }
  end

  def full_name
    "#{self.first_name} #{self.last_name}"
  end

  private

  def assign_role_list
    self.role_list = role_list_tags.join(",") unless role_list_tags.blank?
  end
end
