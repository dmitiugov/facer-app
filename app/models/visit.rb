class Visit < ActiveRecord::Base
  belongs_to :special_guest
  belongs_to :event
end
