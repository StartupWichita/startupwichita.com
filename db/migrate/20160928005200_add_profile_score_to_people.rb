class AddProfileScoreToPeople < ActiveRecord::Migration
  def change
    add_column(:people, :profile_score, :integer, default: 0, null: false)

    add_index(:people, :profile_score)
  end
end
