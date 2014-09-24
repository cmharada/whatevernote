class Tag < ActiveRecord::Base
  validates :name, :user, presence: true
  validates_uniqueness_of :name, scope: :user_id
  
  belongs_to :user
  
  has_many :tag_assignments, dependent: :destroy
  has_many :notes, through: :tag_assignments
end