class SpecialGuestsController < ApplicationController
  respond_to :json
  def index
    #respond_with SpecialGuest.all
    @accaunt = Accaunt.find(current_user.accaunt_id)
    respond_with @accaunt.special_guests
  end
  def show
    @accaunt = Accaunt.find(current_user.accaunt_id)
    @special = SpecialGuest.find_by_id params[:id]

  #byebug
    if @special.nil?
      respond_with flash: "Guest with this ID not found!"
    else
      if @accaunt.special_guests.ids.include?(@special.id)
        respond_with @special
      else
        respond_with flash: "You don't have permission for this action!"
      end
    end
  end
  def create

    params[:avatar] = params[:file]
    params[:file] = false
    #byebug
    @special = SpecialGuest.create(guest_params)
    @special.accaunt = Accaunt.find(current_user.accaunt_id)
    @special.save!
    respond_with @special
  end


  private
  def guest_params
    params.permit(:name, :surname, :avatar, :description, :bio, :age)
  end
end
