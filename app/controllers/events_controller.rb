class EventsController < ApplicationController

  respond_to :json
  #before_filter :authenticate_user!

	def index
    @accaunt = Accaunt.find(current_user.accaunt_id)
    respond_with @accaunt.events
  end
  def show
    @accaunt = Accaunt.find(current_user.accaunt_id)
    @event = Event.find(params[:id])
    if @accaunt.events.ids.include?(@event.id)
      respond_with @event
    else
      respond_with flash: "You don't have permission for this action"
    end
  end
  def create
    #accaunt = Accaunt.find(current_user.accaunt_id)

    @event = Event.create(event_params)
    @event.accaunt = Accaunt.find(current_user.accaunt_id)
    @event.user = User.find(current_user)
    @event.save!
    #byebug
    respond_with @event
  end

  def update
    @event = Event.find(params[:id])
    @event.update!(event_params)
    respond_with @event
  end

  def destroy
    @event = Event.find(params[:id])
    @event.destroy
    respond_with @event
  end

  def authenticate_user!
    if user_signed_in?
      super
    else
      #redirect_to login_path, :notice => 'if you want to add a notice'
      ## if you want render 404 page
      #render :file => File.join(Rails.root, 'public/404'), :formats => [:html], :status => 404, :layout => false
      redirect_to login_path
    end
  end

  private
  def event_params
    params.permit(:name, :description, :date, :file)
  end
  def guests_params
   params.permit(guests: [:name, :surname])
  end
end
