require 'mail'
class TuesdayMailer < ActionMailer::Base
    def send_newsletters
        @http_host = ENV['HTTP_HOST']
        @recent_news = News.where(:created_at => 2.weeks.ago...Time.now()).pluck(:title, :content)
        @recent_events = Event.where(:created_at => 2.weeks.ago...Time.now()).pluck(:title, :content)
        return nil if @recent_news.blank? && @recent_events.blank?
        TuesdayReader.mailing_list.each do |email_address|
            puts "Sending Email to #{email_address}"
            mail(:from => "StartupWichita <no-reply@startupwichita.com>",
                :to => email_address,
                :subject => "Tuesday Newsletter - StartupWichita <#{Date.today.strftime('%B %Y')}>").deliver
        end
    end
end