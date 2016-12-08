class ShowsController < ApplicationController
  respond_to :json
  def index
    respond_with Show.all
  end

  def show

  end

  def update_shows
    byebug
  end

  def create

    if (edit_show_params.has_key?(:edit_shows))
      @edit = edit_show_params[:edit_shows]
      @edit.each do |p|
        @show = Show.find(p[:id])
        @show.update(p)
        #byebug
      end
    end

    if (shows_params.has_key?(:shows))
     # byebug
      shows_params[:shows].map { |show|
       Show.create(event_id: show[:event_id], artist_id: show[:artist_id], artist_name: show[:artist_name], time_start: show[:time_start], time_end: show[:time_end])
      }
    end
    head :created, location: events_path
  end

  def update
    #@show = Show.find(params[:id])
    #@show.update!(show_params)
    #respond_with @show
  end

  def destroy
    show = Show.find(params[:id])
    show.destroy
    respond_with show
  end

  private
  def shows_params
    params.permit(shows: [:event_id, :artist_id, :time_start, :time_end, :artist_name])
  end

  def edit_show_params
    params.permit(edit_shows: [:id, :time_start, :time_end])
  end

end
