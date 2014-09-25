class TagAssignment < ActiveRecord::Base
  validates :tag, :note, presence: true
  validates_uniqueness_of :tag, scope: :note
  
  belongs_to :tag
  belongs_to :note
end
