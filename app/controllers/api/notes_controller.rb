class Api::NotesController < ApplicationController
  def create
    @note = Note.new(note_params)
    if @note.save
      render json: @note
    else
      render json: @note.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  def update
  end
  
  def destroy
  end
  
  def index
    @notes = current_user.notes
    render json: @notes
  end
  
  def show
  end
  
  private
  
  def note_params
    params.require(:note).permit(:title, :notebook_id, :contents)
  end
end
