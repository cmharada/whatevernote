class Notebook < ActiveRecord::Base
  validates :title, presence:true
  
  belongs_to :user
  
  has_many :notes
  
  before_destroy :unassign_notes
  
  private
  
  def unassign_notes
    self.notes.each do |note|
      note.notebook_id = nil
      note.save!
    end
  end
end
