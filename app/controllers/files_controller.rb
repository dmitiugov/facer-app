class FilesController < ApplicationController
  respond_to :json
  def add_file_to_user
    @user = User.find(params[:id])
    @user.avatar = params[:file]
    @user.save!
    respond_with @user
  end
end