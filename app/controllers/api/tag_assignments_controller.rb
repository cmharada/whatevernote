class Api::TagAssignmentsController < ApplicationController
  def create
    @tag_assignment = TagAssignment.new(tag_assignment_params)
    if @tag_assignment.save
      render json: @tag_assignment
    else
      render json: @tag_assignment.errors.full_messages,
             status: :unprocessable_entity
    end
  end
  
  private
  
  def tag_assignment_params
    params.require(:tag_assignment).permit(:tag_id, :note_id)
  end
end
