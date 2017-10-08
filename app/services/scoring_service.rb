require 'net/http'

class ScoringService
  DEFAULT_SCORE = 0.freeze
  GUIDE = {
    allow_contact:        45,
    avatar_file_name:     1,
    bio:                  20,
    company_name:         1,
    email:                15,
    featured:             1000,
    first_name:           5,
    gravatar_image_found: 3,
    interests:            1,
    last_name:            5,
    phone:                0,
    roles:                1,
    skills:               1,
    title:                1,
    twitter_username:     5,
    website:              1
  }.freeze

  def self.call(person)
    score = check_guide  person
    score = check_gravatar person, score
    person.update_column(:profile_score, score)
  end

  def self.check_guide(person, score = DEFAULT_SCORE)
    GUIDE.each { |key, value| score += person.try(key).present? ? value : 0 }
    score
  end

  def self.check_gravatar(person, score)
    unless person.avatar.exists?
      if person.has_gravatar?
        score += GUIDE[:gravatar_image_found]
      else
        score -= GUIDE[:gravatar_image_found]
      end
    end
    score
  end
end
