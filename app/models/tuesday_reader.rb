class TuesdayReader < ActiveRecord::Base  
    belongs_to :person
    validates_presence_of :email, if: -> { person.blank? }, 
        :message => "must be inserted if not connected to Person"
    validates_presence_of :person_id, if: -> { email.blank? }
    validates_uniqueness_of :person_id, if: -> { person.present? }
    validates_uniqueness_of :email, if: -> { email.present? }
    validates_format_of :email, if: -> { email.present? }, :with => /\A\S+@.+\.\S+\z/
    scope :mailing_list, -> { all.map(&:address).uniq }
    def address
        email || person.try(:email)
    end
end
