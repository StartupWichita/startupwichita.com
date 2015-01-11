# == Schema Information
#
# Table name: resources
#
#  id :integer          not null, primary key
#

class Resource < ActiveRecord::Base
  acts_as :topic
  acts_as_taggable
end
