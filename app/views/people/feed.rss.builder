#encoding: UTF-8

xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Startup Wichita - People"
    xml.author "Startup Wichita"
    xml.description "Bringing connections and collisions to the entrepreneur, startup, and tech communities in Wichita, Kansas."
    xml.link "http://www.startupwichita.com"
    xml.language "en"

    for person in @people
      xml.item do
        if person.full_name
          xml.title person.full_name
        else
          xml.title ""
        end
        xml.author "Startup Wichita"
        xml.pubDate person.created_at.to_s(:rfc822)
        xml.link ("http://wwww.startupwichita.com" + profile_path(person))
        xml.guid person.id

        text = person.bio
        xml.description "<p>" + text.to_s + "</p>"

      end
    end
  end
end