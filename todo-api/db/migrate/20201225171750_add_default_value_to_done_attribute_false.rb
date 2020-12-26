class AddDefaultValueToDoneAttributeFalse < ActiveRecord::Migration[6.1]
  def change
    change_column :todos, :done, :boolean, default: false
  end
end
