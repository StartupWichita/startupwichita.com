require 'clockwork'
require_relative 'config/boot'
require_relative 'config/environment'

module Clockwork
  every(1.day, 'Update people scores', at: 'Tuesday 00:00') {
    Person.update_profiles_score
  }
end
