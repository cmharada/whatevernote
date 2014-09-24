class Note < ActiveRecord::Base
  validates :title, :user, presence: true
  validate :user_must_own_notebook
  before_validation :ensure_title
  
  belongs_to :user
  belongs_to :notebook
  
  private
  
  def ensure_title
    self.title = "Untitled" if self.title == ""
  end
  
  def user_must_own_notebook
    if (notebook && notebook.user != user) {
      errors.add(:notebook_id, "must be owned by same user as note");
    }
  end
end
