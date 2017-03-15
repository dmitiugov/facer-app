class VisitsController < ApplicationController
  respond_to :json
  def index
    respond_with Visit.all
  end

  def show

  end

  def check_visit
    @visit = Visit.where(:special_guest => params[:special_id], :event => params[:event_id])
    if @visit.many?
      @visit = @visit.to_a.uniq{|p| p.special_guest}
    end
    #response.set_header("Visit", @visit[0].id)
    respond_with @visit[0]
  end

  def create
    if (visits_params.has_key?(:visits))
      visits_params[:visits].map { |visit|
        @visit = Visit.create(event_id: visit[:event_id], special_guest_id: visit[:special_id])
      }
    end
    respond_with @visit
  end

  def update
    @visit = Visit.find(inside_params[:visit][:id])
    @visit.inside = inside_params[:visit][:inside]
    @visit.save!
    respond_with @visit
  end

  def destroy
      @visit = Visit.find(params[:id])
      @visit.destroy
      respond_with @visit
  end

  private
  def visits_params
    params.permit(visits: [:event_id, :special_id])
  end
  def inside_params
    params.permit(visit: [:id, :inside])
  end

end
