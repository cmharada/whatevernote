class NotebookNote < ActiveRecord::Base
  validates :notebook, presence: true
  validates :note, presence: true, uniqueness: true
  validate :notebook_and_note_owned_by_same_user
  
  belongs_to :notebook
  belongs_to :note
  
  def notebook_and_note_owned_by_same_user
    if (note.user != notebook.user)
      errors.add(:notebook, "doesn't belong to same user as note")
    end
  end
end
