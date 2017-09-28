module TagsHelper

  def skill_tags
    @skill_tags ||= all_skill_tags
  end

  def interest_tags
    @interest_tags ||= all_interest_tags
  end

  def person_role_tags
    @person_role_tags ||= all_person_role_tags
  end

  def all_person_role_tags
    PersonRole.all
  end

  def all_skill_tags
    selected_tags_for("skills")
  end

  def all_interest_tags
    selected_tags_for("interests")
  end

  def selected_tags_for(context)
    ActsAsTaggableOn::Tag.joins(:taggings)
      .where("taggings.context = ?", context)
      .where("taggings_count > 1")
      .where.not("taggings.tagger_id" => nil)
      .distinct
  end
end