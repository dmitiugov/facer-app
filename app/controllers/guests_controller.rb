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
    if (guest_params.has_key?(:guests))
    @guest = guest_params[:guests].map { |guest|
     Guest.create(name: guest[:name], surname: guest[:surname], event_id: guest[:event_id], bio: guest[:bio], age: guest[:age])
     }
    end
  # TODO здесь надо еще сделать проверку ID из таблички @event.special_guests в ID которые приходят из парамс
  # если нет, то удалить ID из таблички
    # То есть сейчас
    #id=[]
    if (special_params.has_key?(:specials))
      @special = special_params[:specials].map { |special|
        id.push(special[:id])

       @special1 = SpecialGuest.find(special[:id])
       @event = Event.find(special[:event_id])
       if (!@event.special_guests.ids.include?(@special1.id))
         @event.special_guests << @special1
       end
      }
    end
    head :created, location: events_path
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
  def destroy
    @guest = Guest.find(params[:id])
    @guest.destroy
    respond_with @guest
  end


  private
  def guest_params
    params.permit(guests: [:name, :surname, :event_id, :bio, :age])
  end
  def special_params
    params.permit(specials: [:id, :event_id])
  end
  def inside_params
    params.permit(guest: [:id, :inside])
  end
end
