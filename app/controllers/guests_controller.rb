class GuestsController < ApplicationController
  respond_to :json
  def index
    respond_with Guest.all
  end
  def show
    respond_with Guest.find(params[:id])
  end
  def create
    respond_with Guest.create(guest_params)
  end


  private
  def guest_params
    params.require(:guest).permit(:name)
  end
end
