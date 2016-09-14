class Event < ActiveRecord::Base
  has_many :guests
	def as_json(options = {})
    super(options.merge(include: :guests))
  end
end
