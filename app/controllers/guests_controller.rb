class GuestsController < ApplicationController
  respond_to :json
  def index
    respond_with Guest.all
  end
  def show
    respond_with Guest.find(params[:id])
  end
  def create
    #byebug
    @guest = guest_params[:guests].map { |guest|
     Guest.create(name: guest[:name], surname: guest[:surname], event_id: guest[:event_id])
     }
    @special = special_params[:specials].map { |special|
     @special1 = SpecialGuest.find(special[:id])
     @event = Event.find(special[:event_id])
     @event.special_guests << @special1
    }
    head :created, location: guest_path(@guest)
  end
  def update

    @guest = Guest.find(inside_params[:guest][:id])
    @guest.inside = inside_params[:guest][:inside]
    @guest.save!
    #byebug
    #head :updated, location: guest_path(@guest)
    head :created, location: guest_path(@guest)
    #byebug
  end



  private
  def guest_params
    params.permit(guests: [:name, :surname, :event_id])
  end
  def special_params
    params.permit(specials: [:id, :event_id])
  end
  def inside_params
    params.permit(guest: [:id, :inside])
  end
end
