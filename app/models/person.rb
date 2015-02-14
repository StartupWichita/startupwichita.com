class Person < ActiveRecord::Base
  acts_as_ordered_taggable
  acts_as_ordered_taggable_on :skills, :interests

  attr_accessor :skill_list, :interest_list

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

  after_create :reconcile_tags
  after_update :reconcile_tags

  def reconcile_tags
    if self.skill_list
  end
end
