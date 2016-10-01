class Accaunt < ActiveRecord::Base
  has_many :events
  has_many :users
  has_many :special_guests
  def as_json(options = {})
    super
  end
end
