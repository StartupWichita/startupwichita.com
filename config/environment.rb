# Load the Rails application.
require File.expand_path('../application', __FILE__)

# Initialize the Rails application.
Rails.application.initialize!

ActsAsTaggableOn.remove_unused_tags = true
ActsAsTaggableOn.force_lowercase = true
