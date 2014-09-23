class Api::NotebooksController < ApplicationController
  def create
    @notebook = current_user.notebooks.new(notebook_params)
    
    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors.full_messages, status: :unprocessable_entity
    end
  end
  
  def update
  end
  
  def index
    @notebooks = current_user.notebooks
    render json: @notebooks
  end
  
  def show
  end
  
  def destroy
  end
  
  private
  
  def notebook_params
    params.require(:notebook).permit(:title)
  end
end
