class TagAssignment < ActiveRecord::Base
  validates :tag, :note, presence: true
  
  belongs_to :tag
  belongs_to :note
end
