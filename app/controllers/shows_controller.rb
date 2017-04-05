class ShowsController < ApplicationController
  respond_to :json
  def index
    respond_with Show.all
  end

  def show

  end


  def check_show
    @show = Show.where(:artist => params[:artist_id], :event => params[:event_id])
    if @show.many?
      @show = @show.to_a.uniq{|p| p.artist}
    end
    respond_with @show[0], location: shows_url
  end

  def delete_all
    @show = Show.where(:event => params[:event_id])
    if @show.present?
      @show.delete_all
    end
    respond_with @show[0], location: shows_url
  end

  def select_all
    delete_all()
    @event = Event.find(params[:event_id])
    params[:artists].map { |artist|
      @show = Show.create(event_id: @event.id, artist_id: artist[:id])
    }
    @show = Show.where(:event => params[:event_id])
    return @show
  end

  def change_show_time
    if (shows_params.has_key?(:shows))
      params[:shows].map { |show|
        @show = Show.find(show[:id])
        @show.time_start = show[:time_start]
        @show.time_end = show[:time_end]
        @show.save!
      }
      respond_with @show
    end
  end

  def create
    if (shows_params.has_key?(:shows))
     # byebug
      shows_params[:shows].map { |show|
       @show = Show.create(event_id: show[:event_id], artist_id: show[:artist_id], artist_name: show[:artist_name], time_start: show[:time_start], time_end: show[:time_end])
      }
    end
    respond_with @show, location: shows_url
  end

  def update
    @show = Show.find(params[:id])
    @show.update!(show_params)
    respond_with @show
  end

  def destroy
    @show = Show.find(params[:id])
    @show.destroy
    respond_with @show
  end

  private
  def shows_params
    params.permit(shows: [:event_id, :artist_id, :time_start, :time_end, :artist_name])
  end

end
