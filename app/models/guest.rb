class Guest < ActiveRecord::Base
  belongs_to :event
  def as_json(options = {})
    super
  end
end
