class StaticPagesController < ApplicationController
  before_action :redirect_if_not_logged_in, only: ["notes"]
  
  def splash
    render :splash
  end
  
  def notes
    render :notes
  end
end
