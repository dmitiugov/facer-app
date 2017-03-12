class Artist < ActiveRecord::Base


  has_attached_file :photo, styles: { medium: "150x150", thumb: "100x100>", big: "700x700>" }, default_url: "/images/missing.png"
  validates_attachment_content_type :photo, content_type: /\Aimage\/.*\z/
  #byebug
  belongs_to :accaunt
  has_many :shows
  has_many :events, :through => :shows
  def as_json(options = {})
    super
        .merge(:photo => photo.url(:medium))
  end

  def self.embed_player
    require 'open-uri'
    ic = Iconv.new('UTF-8//IGNORE', 'UTF-8')
    valid_string = ic.iconv(open('https://zhiff.bandcamp.com/releases').read)
    require 'nokogiri'
    doc = Nokogiri::HTML(valid_string)

    doc.css('meta').each do |meta|
      #puts meta.attributes['property']
      meta_tag = meta.attributes['property'].to_s
      if meta_tag=='og:video'
        @embed = meta.attributes['content'].to_s
      end
    end
    return @embed
  end
end
