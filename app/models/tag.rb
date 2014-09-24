class Tag < ActiveRecord::Base
  validates :name, presence: true
  
  has_many :tag_assignments, dependent: :destroy
  has_many :notes, through: :tag_assignments
end