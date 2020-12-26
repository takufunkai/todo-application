class AddDefaultValueToDoneAttribute < ActiveRecord::Migration[6.1]
  def change
    change_column :todos, :done, :boolean, default: true
  end
end
