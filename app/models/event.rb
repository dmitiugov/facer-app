class Event < ActiveRecord::Base

  has_attached_file :afisha, styles: { medium: "300x300>", thumb: "100x100>" }, default_url: "/images/:style/missing.png"
  validates_attachment_content_type :afisha, content_type: /\Aimage\/.*\z/

  has_many :guests

  def as_json(options={})
    super(options.merge(include: :guests))
        .merge(:afisha => afisha.url)
  end

end
