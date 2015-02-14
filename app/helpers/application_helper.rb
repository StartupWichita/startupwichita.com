module ApplicationHelper

  def profile_image(person)
    person.avatar.exists? ? person.avatar.url : avatar_url(person.email)
  end

  def avatar_url(email)
    gravatar_id = Digest::MD5::hexdigest(email).downcase
    "http://gravatar.com/avatar/#{gravatar_id}.png?s=292&r=g"
  end
end
