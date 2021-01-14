class AddDefaultFalseToPriorityAttribute < ActiveRecord::Migration[6.1]
  def change
    change_column :todos, :priority, :boolean, default: false
  end
end
