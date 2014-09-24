class Note < ActiveRecord::Base
  validates :title, :user, presence: true
  
  before_validation :ensure_title
  
  belongs_to :user
  
  private
  
  def ensure_title
    self.title = "Untitled" if self.title == ""
  end
end
