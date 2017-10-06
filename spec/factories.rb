FactoryGirl.define do
    factory :indication do
    questionable_id 1
    questionable_type "MyString"
    user_id 1
  end

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

  factory :person_email do
    person
    recipient_email 'MyString'
    sender_name 'Sender'
    sender_email 'MyString'
    message 'MyText'
    sender_phone 'MyString'
  end

  factory :person_role do
    name 'MyString'
  end

  factory :user do
    sequence(:email) { |n| "test-#{n}@startupwichita.com" }
    password 'f4k3p455w0rd'
    password_confirmation 'f4k3p455w0rd'
  end

  factory :event do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
    starts_at Time.now
    ends_at 3.hours.from_now
    address '216 N Mosley, Suite 120, Wichita, KS 67226'
  end

  factory :news do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
  end

  factory :resource do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
  end

  factory :topic do
    sequence(:title) { |u| "test-#{u}" }
    content 'content'
  end
end
