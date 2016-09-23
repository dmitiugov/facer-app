class SpecialGuestsController < ApplicationController
  respond_to :json
  def index
    respond_with SpecialGuest.all
  end
  def show
    respond_with SpecialGuest.find(params[:id])
  end
  def create
    respond_with SpecialGuest.create(guest_params)
  end


  private
  def guest_params
    params.require(:special_guests).permit(:name)
  end
end
