class OptInMembersForTuesdayNewsletter < ActiveRecord::Migration
  def change
    reversible do |dir|
      dir.up do
        Person.pluck(:id).map do |id|
          begin
            TuesdayReader.create!(:person_id => id)
          rescue StandardError
            next
          end
        end
      end
      dir.down do
        TuesdayReader.where.not(:person_id => nil).destroy_all
      end
    end
  end
end
