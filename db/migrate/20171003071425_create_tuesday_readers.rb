class CreateTuesdayReaders < ActiveRecord::Migration
  def change
    create_table :tuesday_readers do |t|
      t.references :person
      t.string :email
      t.timestamps
    end
    add_index :tuesday_readers, [:person_id], :unique => true
  end
end
