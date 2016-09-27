module ApplicationHelper

  def markdown
    @markdown ||= Redcarpet::Markdown.new(Redcarpet::Render::HTML, autolink: true, quote: true, )
  end

  def profile_image(person)
    if person.avatar.exists?
      return person.avatar.url(:medium)
    elsif person.email.present?
      return avatar_url(person.email)
    else
      return "https://cldup.com/DlSzJYRl0p.png"
    end
  end

  def owned_by_current_user(person)
    return current_user && current_user.id == person.user_id
  end

  def claimable(person)
    return person.user_id.blank?
  end

  def avatar(user, format, classes = "")
    sizes = { :display => 292, :thumb => 111 }
    if user.avatar? && format == :display
      image_tag user.avatar.display.url, :class => classes
    elsif user.avatar? && format == :thumb
      image_tag user.avatar.thumb.url, :class => classes
    else
      gravatar_image_tag user.email, gravatar: { size: sizes[format] }, :class => classes
    end
  end

  def avatar_url(email)
    default_url = "https://cldup.com/DlSzJYRl0p.png"
    gravatar_id = Digest::MD5::hexdigest(email).downcase
    "https://gravatar.com/avatar/#{gravatar_id}.png?s=292&r=g&d=#{CGI.escape(default_url)}?#{configatron.app_url}/assets/missing.png"
  end

end
