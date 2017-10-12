class Company < ActiveRecord::Base
    validates :name, presence: true

    mount_uploader :logo, AvatarUploader
end
