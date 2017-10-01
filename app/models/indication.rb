class Indication < ActiveRecord::Base
  belongs_to :questionable, polymorphic: true
  belongs_to :user
end
