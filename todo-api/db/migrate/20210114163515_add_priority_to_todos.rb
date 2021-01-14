class AddPriorityToTodos < ActiveRecord::Migration[6.1]
  def change
    add_column :todos, :priority, :boolean
  end
end
