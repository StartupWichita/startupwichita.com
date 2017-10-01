require 'net/http'

class Person < ActiveRecord::Base
  include ApplicationHelper

  SCORING_GUIDE = {
    allow_contact: 45,
    avatar_file_name: 1,
    bio: 20,
    company_name: 1,
    email: 15,
    featured: 1000,
    first_name: 5,
    gravatar_image_found: 3,
    interests: 1,
    last_name: 5,
    phone: 0,
    roles: 1,
    skills: 1,
    title: 1,
    twitter_username: 5,
    website: 1,
    total_posts: 0,
    total_mentions: 0
  }

  extend FriendlyId
  friendly_id :full_name, use: :slugged

  acts_as_ordered_taggable_on :skills, :interests, :roles

  attr_accessor :role_list_tags, :delete_avatar

  # this user relationship is optional (admins can edit people, and so can users who are attached to people)
  belongs_to :user
  has_and_belongs_to_many :news
  has_and_belongs_to_many :events

  scope :featured,     -> { where(featured: true) }
  scope :not_featured, -> { where(featured: false) }

  scope :with_interests, -> { includes(:interests) }
  scope :with_skills,    -> { includes(:skills) }
  scope :with_news,      -> { includes(:news) }
  scope :with_events,    -> { includes(:events) }
  scope :with_associations, -> {
    with_events
      .with_news
      .with_interests
      .with_skills
  }

  default_scope -> { order(profile_score: :desc, updated_at: :desc) }

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

  validates_presence_of :first_name, :last_name, :email

  if ActiveRecord::Base.connection.column_exists?(:people, :profile_score)
    after_save :update_profile_score, on: [:create, :update]
  end

  def full_name
    "#{first_name} #{last_name}".strip
  end

  class << self

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

  def get_total_posts
    @total_posts ||= news.count
  end

  def get_total_mentions
    @total_mentions ||= News.all.map { |news| news.people.where(:id => id) ? 1 : 0 }
    @total_mentions.reduce(&:+)
  end

  def update_profile_score
    total = 0

    SCORING_GUIDE.each do |key, value|
      if key.to_s == 'total_posts'
        total += get_total_posts.present? ? get_total_posts : 0
        next
      elsif key.to_s == 'total_mentions'
        total += get_total_mentions.present? ? get_total_mentions : 0
        next
      end

      total += self.try(key).present? ? value : 0
    end

    unless avatar.exists?
      avatar = URI.parse(avatar_url(email))
      Net::HTTP.start(avatar.host, avatar.port, use_ssl: true) do |http|
        response = http.head "#{avatar.path}?d=404"
        case response.code
        when '200'
          total += SCORING_GUIDE[:gravatar_image_found]
        when '404'
          total -= SCORING_GUIDE[:gravatar_image_found]
        end
      end
    end

    self.update_column(:profile_score, total)
  end

  def completed_profile?
    return false if [first_name, last_name, email, company_name].any? { |attribute| attribute.blank? }
    return false if !has_avatar?
    has_long_bio? || exceed_min_posts_count?(3)
  end

  def has_avatar?
    avatar? || has_gravatar?
  end

  def has_gravatar?
    # same logic as update_profile_score

    avatar = URI.parse(avatar_url(email))
    Net::HTTP.start(avatar.host, avatar.port, use_ssl: true) do |http|
      response = http.head "#{avatar.path}?d=404"
      case response.code
      when '200'
        return true
      when '404'
        return false
      end
    end
  end

  def has_long_bio?
    return false if bio.blank?
    bio.chars.length >= 60
  end

  def exceed_min_posts_count?(count)
    user.topics.count >= count
  end
end
