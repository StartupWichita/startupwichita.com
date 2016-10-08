module MentionsHelper
  def decorate_content_with_mentions(topic)
     slugs = topic.people.map {|p| p.slug }
     content = substitute_mentions_with_links(topic.content, slugs)
     content
  end
  
  private
    def substitute_mentions_with_links(content, slugs)
       slugs.each do|slug|
         url =   Rails.application.routes.url_helpers
                 .profile_url(slug: slug, only_path: true)
         link_text = "@#{slug}"
         content.gsub!(link_text, link_to(link_text, url)) 
       end
       content
    end


end
