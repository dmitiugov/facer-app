class RegistrationsController < Devise::RegistrationsController

  def create
    @user = User.create(sign_up_params)
    @user.accaunt = Accaunt.find(params[:user][:accaunt][:id])
    @user.save!
    respond_with @user
  end

  private

  def sign_up_params
    params.require(:user).permit(:name, :surname, :email, :username, :password, :password_confirmation)
  end

  def account_update_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :password_confirmation, :current_password)
  end
end