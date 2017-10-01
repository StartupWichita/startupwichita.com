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

  has_and_belongs_to_many :people
  has_many :indications, as: :questionable
end
