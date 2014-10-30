class Topic < ActiveRecord::Base
  actable

  belongs_to :user
end
