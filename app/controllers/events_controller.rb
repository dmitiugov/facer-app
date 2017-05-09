class EventsController < ApplicationController
  respond_to :json
  #before_filter :authenticate_user!
  before_action :accaunt_check, only: [:show, :show_archived_events]


	def index
    @accaunt = Accaunt.find(current_user.accaunt_id)
    respond_with @accaunt.events.not_archive
  end
  def show
    @event = Event.find(params[:id])
    if @accaunt.events.ids.include?(@event.id)
      respond_with @event
    else
      respond_with flash: "You don't have permission for this action"
    end
  end

  def get_ranged
    @accaunt = Accaunt.find(current_user.accaunt_id)
    @date_from = params[:range][:date_from]
    @date_to = params[:range][:date_to]
    @archive = params[:archive]

    if @archive
      @events = @accaunt.events.created_between(@date_from, @date_to).archive
    else
      @events = @accaunt.events.created_between(@date_from, @date_to).not_archive
    end
    @events = @events.to_a.uniq{|p| p.id}
    render json: @events
    #byebug
  end
  def move_event_to_archive
    @event=Event.find(params[:id])
    @event.archive=true
    @event.save!
    @accaunt = Accaunt.find(current_user.accaunt_id)
    render json: @accaunt.events.not_archive
  end
  def move_event_from_archive
    @event=Event.find(params[:id])
    @event.archive=false
    @event.save!
    @accaunt = Accaunt.find(current_user.accaunt_id)
    render json: @accaunt.events.archive
  end
  def show_archived_events
    @archive = params[:archive]
    if @archive == true
      @events = @accaunt.events.archive
      @events = @events.to_a.uniq{|p| p.id}
      render json: @events
    end
    if @archive == false
      @events = @accaunt.events.not_archive
      @events = @events.to_a.uniq{|p| p.id}
      render json: @events
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
  def accaunt_check
    @accaunt = Accaunt.find(current_user.accaunt_id)
  end
end
