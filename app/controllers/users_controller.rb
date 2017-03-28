class UsersController < ApplicationController
  respond_to :json
  def index
    respond_with User.all
  end

  def show
    @user = User.where(:username => params[:id])
    render json: @user
  end

  def create

  end

  def update
  end

  def destroy
  end



end