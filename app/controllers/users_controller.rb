class UsersController < ApplicationController
  respond_to :json
  def index
    respond_with User.all
  end

  def show
    @user = User.where(:username => params[:id])
    render json: @user
  end

  def update
    @user=User.find(user_params[:id])
    @user.update!(user_params)
    respond_with @user
  end

  def destroy
  end

  private
  def user_params
    params.permit(:name, :surname, :id)
  end


end