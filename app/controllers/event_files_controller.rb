class EventFilesController < ApplicationController
  def create
    @event_file = EventFile.new(event_file_params)
    if @event_file.save
      render json: {success: true}
    else
      render json: @event_file.errors
    end
  end

  private

  def event_file_params
    params.require(:event_file).permit(:image)
  end
end
