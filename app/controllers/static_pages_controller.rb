class StaticPagesController < ApplicationController
  before_action :redirect_if_not_logged_in, only: ["notes"]
  before_action :redirect_if_logged_in, only: ["welcome"]
  
  def welcome
    render :welcome
  end
  
  def notes
    render :notes
  end
end
