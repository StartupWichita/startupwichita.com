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
      gravatar = URI.parse(avatar_url(person.email))
      Net::HTTP.start(gravatar.host, gravatar.port, use_ssl: true) do |http|
        response = http.head "#{gravatar.path}?d=404"
        case response.code
        when '200'
          score += GUIDE[:gravatar_image_found]
        when '404'
          score -= GUIDE[:gravatar_image_found]
        end
      end
    end
    score
  end

  def self.avatar_url(email)
    default_url = "https://cldup.com/DlSzJYRl0p.png"
    gravatar_id = Digest::MD5::hexdigest(email).downcase
    "https://gravatar.com/avatar/#{gravatar_id}.png?s=292&r=g&d=#{CGI.escape(default_url)}?#{configatron.app_url}/assets/missing.png"
  end
end
