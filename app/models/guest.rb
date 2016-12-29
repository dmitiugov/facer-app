class Guest < ActiveRecord::Base
  belongs_to :event
  after_destroy :log_destroy_action
  def log_destroy_action
     #event.guests.destroy_all
    @guests=event.guests
    @guests.delete_all
    #byebug
  end
  def as_json(options = {})
    super
  end
end
