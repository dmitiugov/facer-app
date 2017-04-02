class FilesController < ApplicationController
  respond_to :json
  def add_file_to_user
    @user = User.find(params[:id])
    @user.avatar = params[:file]
    @user.save!
    respond_with @user
  end
  def add_file_to_special
    @special = SpecialGuest.find(params[:id])
    @special.avatar = params[:file]
    @special.save!
    respond_with @special
  end
  def add_file_to_event
    @event = Event.find(params[:id])
    @event.file = params[:file]
    @event.save!
    respond_with @event
  end
end