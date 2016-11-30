class SpecialGuest < ActiveRecord::Base

  has_attached_file :avatar, styles: { medium: "150x150", thumb: "100x100>", big: "700x700>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/



  belongs_to :accaunt
  has_many :visits
  has_many :events, :through => :visits
  def as_json(options = {})
    super
        .merge(:file => avatar.url(:medium))
  end
end
