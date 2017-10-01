module PersonMentions

  def self.extract_and_link!(topic)
    mentions = topic.content.scan(/@([a-z0-9_\-]+)/i)
    unless mentions.empty? then
      mentioned_people = Person.where(slug: mentions.flatten)
      topic.people = mentioned_people

      mentioned_people.each { |person| person.update_profile_score }
    end
  end

end
