#encoding: UTF-8

xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Startup Wichita - Resources"
    xml.author "Startup Wichita"
    xml.description "Bringing connections and collisions to the entrepreneur, startup, and tech communities in Wichita, Kansas."
    xml.link "http://www.startupwichita.com"
    xml.language "en"

    for resource in @resources
      xml.item do
        if resource.title
          xml.title resource.title
        else
          xml.title ""
        end
        xml.author resource.user.person.full_name
        xml.pubDate resource.created_at.to_s(:rfc822)
        xml.link ("http://www.startupwichita.com" + resources_path(resource))
        xml.guid resource.id

        text = resource.content
        xml.description "<p>" + text.to_s + "</p>"

      end
    end
  end
end
