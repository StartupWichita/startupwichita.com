class AtWhoController < ApplicationController
  def index
    render json: serialized_people
  end

  private

  def serialized_people
    Person.all.map do |profile|
      {
        slug: profile.slug,
        full_name: profile.full_name,
      }
    end
  end
end
