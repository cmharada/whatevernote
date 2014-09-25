class Api::NotesController < ApplicationController
  def create
    @note = current_user.notes.new(note_params)
    if @note.save
      render json: @note
    else
      render json: @note.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  def update
    @note = current_user.notes.find(params[:id])
    @note.update(note_params)
    if @note.save
      render json: @note
    else
      render json: @note.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  def destroy
    @note = current_user.notes.find(params[:id]);
    @note.destroy!
    render json: {}
  end
  
  def index
    @notes = current_user.notes
    render :index
  end
  
  def show
    @note = current_user.notes.find(params[:id])
    render :show
  end
  
  private
  
  def note_params
    params.require(:note).permit(:title, :contents, :notebook_id)
  end
end
