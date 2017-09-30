require 'rails_helper'

<% module_namespacing do -%>
describe <%= class_name %>Controller, type: :controller do
  render_views

end

<% end -%>
