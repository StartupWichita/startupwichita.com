require 'spec_helper'

describe RegistrationsController, type: :controller do
  render_views

  let(:user) { FactoryGirl.create(:user, password: 'password', password_confirmation: 'password', person: person) }
  let(:person) { FactoryGirl.create(:person) }

  before(:each) do
    request.env['devise.mapping'] = Devise.mappings[:user]
    sign_in user
  end

  context 'when changing password' do
    context 'with valid current password' do
      it 'redirects to home page' do
        put :update, { user: { password: 'new_password' } }

        expect(response).to redirect_to root_path
      end

      it 'should update password' do
        expect do
          put :update, { user: { password: 'new_password' } }
        end.to change { user.reload.valid_password? 'new_password' }.to true
      end
    end

    context 'with invalid password' do
      it 'renders user page' do
        put :update, { user: { password: 'short' } }

        expect(response).to render_template :edit
      end

      it 'contains error' do
        put :update, { user: { password: 'short' } }

        expect(response.body).to match(/prohibited this user from being saved/)
      end
    end
  end
end
