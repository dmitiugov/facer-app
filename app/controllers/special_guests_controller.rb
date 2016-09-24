class SpecialGuestsController < ApplicationController
  respond_to :json
  def index
    respond_with SpecialGuest.all
  end
  def show
    respond_with SpecialGuest.find(params[:id])
  end
  def create
    params[:avatar] = params[:file]
    params[:file] = false
    #byebug
    respond_with SpecialGuest.create(guest_params)
  end


  private
  def guest_params
    params.permit(:name, :surname, :avatar, :description, :bio, :age)
  end
end
