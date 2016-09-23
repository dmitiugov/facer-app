class SpecialGuest < ActiveRecord::Base
  has_and_belongs_to_many :events
  def as_json(options = {})
    super
  end
end
