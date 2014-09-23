class Note < ActiveRecord::Base
  validates :title, :notebook, presence: true
  
  before_validation :ensure_title
  
  belongs_to :notebook
  
  private
  
  def ensure_title
    self.title = "Untitled" if self.title == ""
  end
end
