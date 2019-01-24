class TodoListsController < ApplicationController
  before_action :set_default_response_format, except: %i[index show]
  before_action :set_todo_list, only: [:show, :edit, :update, :destroy]
  
  # GET /todo_lists
  # GET /todo_lists.json
  def index
    @todo_lists = TodoList.all.order('created_at DESC')
  end

  # GET /todo_lists/1
  def show
  end
  
  # POST /todo_lists.json
  def create
    @todo_list = TodoList.new(todo_list_params)
    if @todo_list.save
      render :show, status: :created, location: @todo_list
    else
      render json: @todo_list.errors, status: :unprocessable_entity
    end
  end
  
  # PATCH/PUT /todo_lists/1.json
  def update
    if @todo_list.update(todo_list_params)
      render :show, status: :ok, location: @todo_list
    else
      render json: @todo_list.errors, status: :unprocessable_entity
    end
  end
  
  
  # DELETE /todo_lists/1.json
  def destroy
    @todo_list.destroy
    head :no_content
  end

  def mark_all
    TodoList.update_all(completed: true)
    head :no_content
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_todo_list
      @todo_list = TodoList.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def todo_list_params
      params.require(:todo_list).permit(:text, :completed)
    end

    def set_default_response_format
      request.format = :json
    end
end
