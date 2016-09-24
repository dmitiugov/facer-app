class Event < ActiveRecord::Base

  has_attached_file :file, styles: { medium: "300x300>", thumb: "100x100>", big: "700x700>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :file, content_type: /\Aimage\/.*\z/

  has_many :guests
  has_and_belongs_to_many :special_guests
  def as_json(options={})
    super(options.merge(include: :special_guests))
        .merge(:file => file.url(:medium))
        .merge(:guests => guests)
  end
end
