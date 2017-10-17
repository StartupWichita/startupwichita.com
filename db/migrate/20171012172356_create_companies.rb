class CreateCompanies < ActiveRecord::Migration
  def change
    create_table :companies do |t|
      t.string :name
      t.string :logo
      t.string :website
      t.text :description

      t.timestamps
    end
  end
end
