# == Schema Information
#
# Table name: news
#
#  id :integer          not null, primary key
#

class News < ActiveRecord::Base
  acts_as :topic
end
