FactoryGirl.define do
  factory :user do
    sequence(:email)      { |n| "test-#{n}@startupwichita.com" }
    password              'f4k3p455w0rd'
    password_confirmation 'f4k3p455w0rd'
  end

  factory :event do
    sequence(:title)      { |u| "test-#{u}" }
    content               'content'
    starts_at             Time.now
    ends_at               3.hours.from_now
    address               '216 N Mosley, Suite 120, Wichita, KS 67226'
  end

  factory :news do
    sequence(:title)      { |u| "test-#{u}" }
    content               'content'
  end

  factory :resource do
    sequence(:title)      { |u| "test-#{u}" }
    content               'content'
  end

  factory :topic do
    sequence(:title)      { |u| "test-#{u}" }
    content               'content'
  end
end
