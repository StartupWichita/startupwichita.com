FactoryGirl.define do
  factory :person do
    user
    first_name 'Charles'
    last_name 'Lee'
    email 'charles.lee@example.com'
    phone '999-999-9999'
    website 'charleschanlee@example.com'
    company_name 'Charlie Co.'
    title 'Software Engineer'
    twitter_username 'ExampleChar'
    bio 'Software engineer participating in Hackoberfest!'
    avatar_file_name 'example_avatar.jpg'
    allow_contact true
  end
end
