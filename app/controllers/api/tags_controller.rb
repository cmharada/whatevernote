class Api::TagsController < ApplicationController
  def create
    @tag = current_user.tags.new(tag_params)
    
    if @tag.save
      render :show
    else
      render json: @tag.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  def show
    @tag = current_user.tags.find(params[:id])
    render :show
  end
  
  def index
    @tags = current_user.tags
    render :index
  end
  
  def destroy
    @tag = current_user.tags.find(params[:id])
    @tag.destroy!
    render json: {}
  end
  
  def update
    @tag = current_user.tags.find(params[:id])
    if @tag.update(tag_params)
      render json: @tag
    else
      render json: @tag.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  private
  
  def tag_params
    params.require("tag").permit(:name)
  end
end
