module ApplicationHelper
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
end
