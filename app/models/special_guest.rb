class SpecialGuest < ActiveRecord::Base

  has_attached_file :avatar, styles: { medium: "150x150", thumb: "100x100>", big: "700x700>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :avatar, content_type: /\Aimage\/.*\z/


  has_and_belongs_to_many :events
  belongs_to :accaunt
  def as_json(options = {})
    super
        .merge(:file => avatar.url(:medium))
  end
end
