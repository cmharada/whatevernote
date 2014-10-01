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
    #includes
    @notes = current_user.notes.includes(:tags);
    render :index
  end
  
  def show
    @note = current_user.notes.find(params[:id])
    render :show
  end
  
  def assign
    @note = current_user.notes.find(params[:id])
    tag = current_user.tags.find(params[:tag_id])
    @note.tags << tag
    render :show
  end
  
  def unassign
    @note = current_user.notes.find(params[:id])
    tag = current_user.tags.find(params[:tag_id])
    @note.tags.delete tag
    render :show
  end
  
  private
  
  def note_params
    params.require(:note).permit(:title, :contents, :notebook_id)
  end
end
