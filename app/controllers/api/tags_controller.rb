class TagsController < ApplicationController
  def create
  end
  
  def show
    @tag = Tag.find(params[:id]);
    render json: @tag
  end
  
  def index
    @tags = current_user.tags
    render json: @tags
  end
  
  def destroy
  end
  
  def update
  end
end
