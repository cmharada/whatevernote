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
    @tag = Tag.find(params[:id]);
    render :show
  end
  
  def index
    @tags = current_user.tags
    render :index
  end
  
  def destroy
  end
  
  def update
  end
  
  private
  
  def tag_params
    params.require("tag").permit(:name)
  end
end
