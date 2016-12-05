class ShowsController < ApplicationController
  respond_to :json
  def index
    respond_with Show.all
  end

  def show

  end

  def create
    if (shows_params.has_key?(:shows))
      #byebug
      shows_params[:shows].map { |show|
        Show.create(event_id: show[:event_id], artist_id: show[:artist_id])
      }
    end
    head :created, location: events_path
  end

  def update

  end

  def destroy
    show = Show.find(params[:id])
    show.destroy
    respond_with show
  end

  private
  def shows_params
    params.permit(shows: [:event_id, :artist_id])
  end

end
