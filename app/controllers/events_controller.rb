class EventsController < ApplicationController

  respond_to :json
  #before_filter :authenticate_user!

	def index
    respond_with Event.all
  end
  def show
    respond_with Event.find(params[:id])
  end
  def create

    @event = Event.create(event_params)

    #byebug


    respond_with @event
  end

  def edit
    respond_with Event.find(params[:id])
  end

  def update
    @event = Event.find(params[:id])
    @event.update!(event_params)
    respond_with @event
    @guests = guests_params[:guests].map { |guest|
    Guest.create(name: guest[:name], surname: guest[:surname], event: @event)
    }
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
