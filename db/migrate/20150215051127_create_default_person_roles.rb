class CreateDefaultPersonRoles < ActiveRecord::Migration
  def self.up
    PersonRole.create(:name => 'Advisor')
    PersonRole.create(:name => 'Angel')
    PersonRole.create(:name => 'Attorney')
    PersonRole.create(:name => 'Backend Developer')
    PersonRole.create(:name => 'Data Scientist')
    PersonRole.create(:name => 'Entrepreneur')
    PersonRole.create(:name => 'Finance')
    PersonRole.create(:name => 'Frontend Developer')
    PersonRole.create(:name => 'Full Stack Developer')
    PersonRole.create(:name => 'Hardware Engineer')
    PersonRole.create(:name => 'Human Resources')
    PersonRole.create(:name => 'Marketing')
    PersonRole.create(:name => 'Mobile Developer')
    PersonRole.create(:name => 'Office Manager')
    PersonRole.create(:name => 'Operations')
    PersonRole.create(:name => 'Product Manager')
    PersonRole.create(:name => 'Sales')
    PersonRole.create(:name => 'Seed Fund')
  end

  def self.down
    PersonRole.delete_all
  end
end
