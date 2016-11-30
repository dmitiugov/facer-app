class VisitsController < ApplicationController
  respond_to :json
  def index
    respond_with Visit.all
  end

  def show

  end

  def create
    if (visits_params.has_key?(:visits))
      #byebug
      visits_params[:visits].map { |visit|
        Visit.create(event_id: visit[:event_id], special_guest_id: visit[:special_id])
      }
    end
    head :created, location: events_path
  end

  def update

  end

  def destroy
    visit = Visit.find(params[:id])
    visit.destroy
    respond_with visit
  end

  private
  def visits_params
    params.permit(visits: [:event_id, :special_id])
  end
end
