module Api::V1
    class TodosController < ApplicationController
  
      def index
        @todos = Todo.all
        render json: @todos
      end
  
      def show
        @todos = Todo.find(params[:id])
        render json: @todos
      end
  
      def create
        @todos = Todo.new(todo_params)
  
        if @todos.save
          render json: @todos, status: :created
        else
          render json: @todos.errors, status: :unprocessable_entity
        end
      end
  
      def update
        @todos = Todo.find(params[:id])
        if @todos.update(todo_params)
          render json: @todos
        else
          render json: @todos.errors, status: :unprocessable_entity
        end
      end
  
      def destroy
        @todos = Todo.find(params[:id])
        @todos.destroy
      end
      ###############################################################
      private
  
      def todo_params
        params
            .require(:todo)
            .permit(:title, :tag, :done, :user_id, :due_date, :priority)
      end
  
    end
  end