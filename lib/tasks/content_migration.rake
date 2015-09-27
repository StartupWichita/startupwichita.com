namespace :migration do
  task :content_data => :environment do
    require 'json'

    def user_email_for_mongoid(id, records)
      user_json = records.find { |u| u['_id']['$oid'] == id }
      User.where(email: user_json['email']).first
    end

    topic_file = File.read("#{Rails.root}/topic_data.json")
    user_file = File.read("#{Rails.root}/users.json")
    topic_records = JSON.parse(topic_file)
    user_records = JSON.parse(user_file)

    result_file = File.open("#{Rails.root}/tmp/tinfo", 'w+')

    news_failed = 0
    events_failed = 0
    resources_failed = 0

    news_records = topic_records.dup.keep_if { |t| t['__t'] == 'News' }
    news_records.each do |news_record|
      new_news = News.new

      new_news.title = news_record['title']
      new_news.content = news_record['content']
      new_news.url = news_record['url']
      new_news.user = user_email_for_mongoid(news_record['author']['$oid'], user_records)

      if !new_news.save
        news_failed += 1
        result_file.write("NEWS FAILED: #{news_record['title']}\n")
      end
    end

    events_records = topic_records.dup.keep_if { |t| t['__t'] == 'Event' }
    events_records.each do |event_record|
      new_event = Event.new

      new_event.title = event_record['title']
      new_event.content = event_record['content']
      new_event.url = event_record['url']
      new_event.user = user_email_for_mongoid(event_record['author']['$oid'], user_records)

      new_event.starts_at = DateTime.strptime((event_record['startTime']['$date'] / 1000).to_s, '%s')
      new_event.ends_at = DateTime.strptime((event_record['endTime']['$date'] / 1000).to_s, '%s')
      new_event.address = event_record['address']

      if !new_event.save
        events_failed += 1
        result_file.write("EVENT FAILED: #{event_record['title']}\n")
      end
    end

    resources_records = topic_records.dup.keep_if { |t| t['__t'] == 'Resource' }
    resources_records.each do |resource_record|
      new_resource = Resource.new

      new_resource.title = resource_record['title']
      new_resource.content = resource_record['content']
      new_resource.url = resource_record['url']
      new_resource.user = user_email_for_mongoid(resource_record['author']['$oid'], user_records)

      if !new_resource.save
        resources_failed += 1
        result_file.write("RESOURCE FAILED: #{resource_record['title']}\n")
      end
    end

    result_file.write("News: #{news_failed} / #{news_records.count} failed\n")
    result_file.write("Events: #{events_failed} / #{events_records.count} failed\n")
    result_file.write("Resources: #{resources_failed} / #{resources_records.count} failed\n")

  end
end
