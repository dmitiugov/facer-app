class AccauntsController < ApplicationController
  respond_to :json
  def index
    @accaunt = Accaunt.all()
    respond_with @accaunt
  end
  def get_all_accaunts
    @accaunt = Accaunt.all()
    @accaunt = @accaunt.to_a.uniq{|p| p.id}
    respond_with @accaunt
  end
  def add_accaunt_to_user
    @user=User.find(params[:user_id])
    @user.accaunt = Accaunt.find(params[:accaunt])
    @user.save!
    respond_with @user
  end
end