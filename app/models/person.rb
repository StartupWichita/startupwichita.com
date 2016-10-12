class Person < ActiveRecord::Base
  SCORING_GUIDE = {
    first_name: 5, last_name: 5, email: 15, phone: 0, title: 1, twitter_username: 5,
    allow_contact:45, interests: 1, roles: 1, website: 1, company_name: 1, bio: 20,
    skills: 1, avatar_file_name: 1, featured: 1000
  }

  extend FriendlyId
  friendly_id :full_name, use: :slugged

  acts_as_ordered_taggable_on :skills, :interests, :roles

  attr_accessor :role_list_tags, :delete_avatar

  # this user relationship is optional (admins can edit people, and so can users who are attached to people)
  belongs_to :user
  has_and_belongs_to_many :news
  has_and_belongs_to_many :events

  scope :featured, -> { where(featured: true) }
  default_scope -> { order(profile_score: :desc).order(updated_at: :desc) }

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
    medium: '300x300!'
  }
  do_not_validate_attachment_file_type :avatar

  before_validation :assign_role_list
  before_validation { avatar.clear if delete_avatar == '1' }

  validates_presence_of :first_name, :last_name

  if ActiveRecord::Base.connection.column_exists?(:people, :profile_score)
    after_save :update_profile_score, on: [:create, :update]
  end

  def full_name
    "#{first_name} #{last_name}".strip
  end

  class << self

    def all_skill_tags
      ActsAsTaggableOn::Tagging.where(context: "skills").where.not(tagger_id: nil).map {|tagging| { "id" => "#{tagging.tag.id}", "name" => tagging.tag.name, "tagging_count" => tagging.tag.taggings_count } }.select{|t| t['tagging_count'] > 1}.uniq
    end

    def all_interest_tags
      ActsAsTaggableOn::Tagging.all.where(context: "interests").map {|tagging| { "id" => "#{tagging.tag.id}", "name" => tagging.tag.name, "tagging_count" => tagging.tag.taggings_count } }.select{|t| t['tagging_count'] > 1}.uniq
    end

    def all_person_role_tags
      PersonRole.all.map {|role| { "id" => "#{role.id}", "name" => role.name } }
    end

  private

    def to_csv
      CSV.generate do |csv|
        csv << column_names
        all.each { |person| csv << person.attributes.values_at(*column_names) }
      end
    end
  end

  def assign_role_list
    self.role_list = role_list_tags.join(",") unless role_list_tags.blank?
  end

  def update_profile_score
    total = 0

    SCORING_GUIDE.each { |key, value| total += self.try(key).present? ? value : 0 }

    self.update_column(:profile_score, total)
  end
end
