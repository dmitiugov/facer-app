class Artist < ActiveRecord::Base

  has_attached_file :photo, styles: { medium: "150x150", thumb: "100x100>", big: "700x700>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/

  belongs_to :accaunt
  has_many :shows
  has_many :events, :through => :shows
  def as_json(options = {})
    super
        .merge(:photo => photo.url(:medium))
  end

end
