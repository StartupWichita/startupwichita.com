require 'securerandom'

namespace :devise do
  desc 'Mass password reset and send email instructions'
  task :mass_password_reset => :environment do
    begin
      User.all.each do |record|
        # Assign a random password
        random_password = SecureRandom.hex
        record.password = random_password
        record.save

        UserMailer.password_reset(record, random_password).deliver
      end
    rescue Exception => e
      puts "Error: #{e.message}"
    end
  end
end
