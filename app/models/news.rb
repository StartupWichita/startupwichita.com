# == Schema Information
#
# Table name: news
#
#  id :integer          not null, primary key
#

class News < ActiveRecord::Base
  default_scope { order('topics.created_at desc') }
  acts_as :topic
  acts_as_taggable
end
