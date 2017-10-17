namespace :companies do
  namespace :fake do
    desc 'Add fake companies'
    task fake_companies: :environment do
      10.times do
        Company.create(
          {
            name: Faker::Company.name,
            website: Faker::Internet.url,
            logo: Faker::Company.logo,
            description: Faker::Company.catch_phrase
          }
        )
      end
    end
  end
end
