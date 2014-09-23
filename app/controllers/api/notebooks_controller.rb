class Api::NotebooksController < ApplicationController
  def create
    @notebook = current_user.notebooks.new(notebook_params)
    
    if @notebook.save
      render json: @notebook
    else
      render json: @notebook.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  def update
    @notebook = current_user.notebooks.find(params[:id])
    if @notebook.update(notebook_params)
      render json: @notebook
    else
      render json: @notebook.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  def index
    @notebooks = current_user.notebooks
    render json: @notebooks
  end
  
  def show
    @notebook = current_user.notebooks.find(params[:id]);
    render json: @notebook
  end
  
  def destroy
    @notebook = current_user.notebooks.find(params[:id]);
    @notebook.destroy!
    render json: {}
  end
  
  private
  
  def notebook_params
    params.require(:notebook).permit(:title)
  end
end
