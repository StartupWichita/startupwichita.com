require 'date'
desc "This task is called by the Heroku scheduler add-on"
task :tuesday_newsletter => :environment do
    TuesdayNewslettersJob.perform_now if Date.today.tuesday?
end