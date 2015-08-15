# require "#{Rails.root}/app/helpers/application_helper"
# include ApplicationHelper
#
# namespace :people do
#   desc "Reselect featured people for the current week"
#
#   #######################################################
#   # Set different people as featured each week
#   #######################################################
#   task :weekly_featured_people => :environment do
#     puts "Changing the featured people for this week"
#
#     # Only change on Sunday
#     if Time.zone.now.wday == 0
#       # Make sure we select different people at least each consecutive week, so get last week's winners
#       featured_person_ids = Person.where(featured: true).collect{ |p| p.id }
#
#       # Clear all from being featured
#       Person.update_all(featured: false)
#
#       # Get a random sample of people who weren't in last weeks list
#       # the number of people is expected to be small, so no focus on efficiency.
#       if featured_person_ids.size > 0
#         people = Person.where("id not in (?)", featured_person_ids)
#       else
#         people = Person.all
#       end
#
#       winners = people.sample(3)
#       winners.each do |person|
#         person.featured = true
#         person.save()
#       end
#     else
#       puts "Its not Sunday, not going to reset featured list"
#     end
#
#     puts "Done changing the featured people for this week"
#   end
# end
