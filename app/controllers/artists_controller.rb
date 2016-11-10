class ArtistsController < ApplicationController
  respond_to :json
  def index
    accaunt = Accaunt.find(current_user.accaunt_id)
    respond_with accaunt.artists
  end
  def show
    accaunt = Accaunt.find(current_user.accaunt_id)
    artist = Artist.find_by_id params[:id]
    if artist.nil?
      respond_with flash: "Artist with this ID not found!"
    else
      if accaunt.artists.ids.include?(artist.id)
        respond_with artist
      else
        respond_with flash: "You don't have permission for this action!"
      end
    end
  end
  def create
    params[:photo] = params[:file]
    params[:file] = false
    artist = Artist.create(artist_params)
    artist.accaunt = Accaunt.find(current_user.accaunt_id)
    artist.save!
    respond_with artist
  end
  def update

  end



  private
  def artist_params
    params.permit(:name, :photo, :description, :bio)
  end

end
