class ArtistsController < ApplicationController
  respond_to :json
  def index
    #@embed = Artist.embed_player
    #byebug
    @accaunt = Accaunt.find(current_user.accaunt_id)
    respond_with @accaunt.artists
  end
  def show
    @accaunt = Accaunt.find(current_user.accaunt_id)
    @artist = Artist.find_by_id params[:id]
    if @artist.nil?
      respond_with flash: "Artist with this ID not found!"
    else
      if @accaunt.artists.ids.include?(@artist.id)
        respond_with @artist
      else
        respond_with flash: "You don't have permission for this action!"
      end
    end
  end
  def create
    params[:photo] = params[:file]
    @artist = Artist.create(artist_params)
    @artist.accaunt = Accaunt.find(current_user.accaunt_id)
    @artist.save!
    respond_with @artist
  end


  def update

    @artist = Artist.find(params[:id])
    @artist.update!(artist_params)
    respond_with @artist

    if (params[:file])
      @artist.photo = params[:file]
      @artist.save
    end
  end

  private
  def artist_params
    params.permit(:name, :photo, :description, :bio, :bandcamp, :soundcloud)
  end

end
