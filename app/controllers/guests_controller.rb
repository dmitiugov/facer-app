class GuestsController < ApplicationController
  respond_to :json
  def index
    respond_with Guest.all
  end
  def show
    respond_with Guest.find(params[:id])
  end
  def create
    @guest = guest_params[:guests].map { |guest|
     Guest.create(name: guest[:name], surname: guest[:surname], event_id: guest[:event_id])
     }
    render "events.json"
  end


  private
  def guest_params
    params.permit(guests: [:name, :surname, :event_id])
  end
end
