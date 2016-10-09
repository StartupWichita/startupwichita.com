module PersonMentions

  def self.extract_and_link!(topic)
    mentions = topic.content.scan(/@([a-z0-9_\-]+)/i)
    unless mentions.empty? then
      topic.people = Person.where(slug: mentions.flatten)
    end
  end

end
