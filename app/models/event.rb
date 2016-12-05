class Event < ActiveRecord::Base

  has_attached_file :file, styles: { medium: "300x300>", thumb: "100x100>", big: "700x700>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :file, content_type: /\Aimage\/.*\z/
  belongs_to :accaunt
  belongs_to :user
  has_many :guests
  has_many :shows
  has_many :visits
  has_many :artists, :through => :shows
  has_many :special_guests, :through => :visits
  def as_json(options={})
    super(options)
        .merge(:file => file.url(:medium))
        .merge(:guests => guests)
        .merge(:special_guests => special_guests(:avatar => file.url(:thumb)))
        .merge(:user => user)
        .merge(:artists => artists)
        .merge(:visits => visits)
        .merge(:shows => shows)
  end
end
