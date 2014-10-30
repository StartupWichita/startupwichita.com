class Topic < ActiveRecord::Base
  acts_as_superclass

  belongs_to :user
end
