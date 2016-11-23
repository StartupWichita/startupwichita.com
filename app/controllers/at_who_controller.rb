class AtWhoController < ApplicationController
  def index
    render json: serialized_people
  end

  private

  def serialized_people
    [].tap do |collection|
      Person.find_each do |person|
        collection << {
          slug: person.slug,
          full_name: person.full_name,
        }
      end
    end
  end
end
