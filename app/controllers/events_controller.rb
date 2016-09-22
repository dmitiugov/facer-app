class EventsController < ApplicationController

  respond_to :json
  before_filter :authenticate_user!

	def index
    respond_with Event.all
  end
  def show
    respond_with Event.find(params[:id])
  end
  def create
    @event = Event.create(event_params)
    @guests = guests_params[:guests].each do |guest|
      #byebug
      Guest.create(name: guest[1][:name], surname: guest[1][:surname], event: @event)
    end
    respond_with @event
  end

  def saveEvent
    @event = Event.new(file_params)
    if @event.save
      render json: {success: true}
    else
      render json: @event.errors
    end
  end



  def destroy
    @event = Event.find(params[:id])
    @event.destroy

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
