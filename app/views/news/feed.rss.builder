#encoding: UTF-8

xml.instruct! :xml, :version => "1.0"
xml.rss :version => "2.0" do
  xml.channel do
    xml.title "Startup Wichita - News"
    xml.author "Startup Wichita"
    xml.description "Bringing connections and collisions to the entrepreneur, startup, and tech communities in Wichita, Kansas."
    xml.link "http://www.startupwichita.com"
    xml.language "en"

    for news in @news
      xml.item do
        if news.title
          xml.title news.title
        else
          xml.title ""
        end
        xml.author news.user.name
        xml.pubDate news.created_at.to_s(:rfc822)
        xml.link ("http://www.startupwichita.com" + news_path(news))
        xml.guid news.id

        text = news.content
        xml.description "<p>" + text + "</p>"

      end
    end
  end
end
