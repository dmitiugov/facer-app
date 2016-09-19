class EventFile < ActiveRecord::Base
  mount_uploader :url, AfishaUploader
end
