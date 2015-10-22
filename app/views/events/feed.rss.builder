#encoding: UTF-8

xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Startup Wichita - Events"
    xml.author "Startup Wichita"
    xml.description "Bringing connections and collisions to the entrepreneur, startup, and tech communities in Wichita, Kansas."
    xml.link "http://www.startupwichita.com"
    xml.language "en"

    for event in @events
      xml.item do
        if event.title
          xml.title event.title
        else
          xml.title ""
        end
        xml.author event.user.person.full_name
        xml.pubDate event.created_at.to_s(:rfc822)
        xml.link ("http://www.startupwichita.com" + event_path(event))
        xml.guid event.id

        text = event.content
        xml.description "<p>" + text + "</p>"

      end
    end
  end
end
