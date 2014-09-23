class Notebook < ActiveRecord::Base
  validates :title, presence:true
  
  belongs_to :user
  
  has_many :notes
end
