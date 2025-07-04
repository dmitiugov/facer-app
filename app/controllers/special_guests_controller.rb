class SpecialGuestsController < ApplicationController
  respond_to :json
  def index
    @accaunt = Accaunt.find(current_user.accaunt_id)
    respond_with @accaunt.special_guests
  end
  def show
    @accaunt = Accaunt.find(current_user.accaunt_id)
    @special = SpecialGuest.find_by_id params[:id]
    if @special.nil?
      respond_with flash: "Guest with this ID not found!"
    else
      #byebug
      if @accaunt.special_guests.ids.include?(@special.id)
        respond_with @special
      else
        respond_with flash: "You don't have permission for this action!"
      end
    end
  end
  def create
    params[:avatar] = params[:file]
    @special = SpecialGuest.create(guest_params)
    @special.accaunt = Accaunt.find(current_user.accaunt_id)
    @special.save!
    respond_with @special
  end
  def update
    @special = SpecialGuest.find(guest_params[:id])
    @special.update!(guest_params)
    respond_with @special
  end



  private
  def guest_params
    params.permit(:id, :name, :surname, :avatar, :description, :bio, :age)
  end
end
