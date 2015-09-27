namespace :migration do
  task :user_data => :environment do
    require 'json'

    User.all.destroy_all
    Person.all.destroy_all

    user_file = File.read("#{Rails.root}/user_data.json")
    user_records = JSON.parse(user_file)

    result_file = File.open("#{Rails.root}/tmp/uinfo", 'w+')

    users_total = user_records.length
    users_failed = 0
    persons_failed = 0
    persons_needing_name_fix = 0

    user_records.each do |user_data|
      result_file.write("#{user_data['name']} <#{user_data['email']}>\n\n")

      # Create a user object
      new_user = User.new(email: user_data['email'])

      # Set a temp password, record somewhere
      temp_pass = SecureRandom.urlsafe_base64(12)

      new_user.password = temp_pass
      new_user.password_confirmation = temp_pass
      new_user.admin = (user_data['role'] == 'Admin')

      if new_user.save
        result_file.write("User Save: true\n")
        result_file.write("Temp: #{temp_pass}\n")
      else
        result_file.write("User Save: false\n")
        result_file.write("User Errors: #{new_user.errors.full_messages.to_sentence}\n")
        users_failed += 1
      end

      # Create a person object, tie to user
      new_person = Person.new
      new_person.user = new_user if new_user.valid?

      # If we can get a solid first/last name, use that, otherwise put all in first
      if user_data['name'].split(' ').length == 2
        new_person.first_name = user_data['name'].split(' ')[0]
        new_person.last_name = user_data['name'].split(' ')[1]
        result_file.write("Needs Name Fix: false\n")
      else
        name_arr = user_data['name'].split(' ')
        new_person.first_name = name_arr[0]
        new_person.last_name = name_arr[1..name_arr.length-1].join(' ')
        new_person.last_name = '?' if name_arr.length == 1
        result_file.write("Needs Name Fix: true\n")
        persons_needing_name_fix += 1
      end

      new_person.bio = "#{user_data['tagline']}\n\n\n\n#{user_data['bio']}"
      new_person.email = user_data['email']
      new_person.featured = user_data['featured']

      if new_person.save
        result_file.write("Person Save: true\n")
      else
        result_file.write("Person Save: false\n")
        result_file.write("Person Errors: #{new_person.errors.full_messages.to_sentence}\n")
        persons_failed += 1
      end

      result_file.write("\n------------\n")
    end

    result_file.write("Users Failed: #{users_failed} / #{users_total}\n")
    result_file.write("Persons Failed: #{persons_failed} / #{users_total}\n")
    result_file.write("Name Fixes: #{persons_needing_name_fix} / #{users_total}\n")
  end
end
