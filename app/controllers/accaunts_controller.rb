class AccauntsController < ApplicationController
  respond_to :json
  def get_all_accaunts
    @accaunt = Accaunt.all()
    @accaunt = @accaunt.to_a.uniq{|p| p.id}
    respond_with @accaunt
  end
end