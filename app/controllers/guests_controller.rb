class GuestsController < ApplicationController
  respond_to :json
  def index
    respond_with Guest.all
  end
  def show
    respond_with Guest.find(params[:id])
  end
end
