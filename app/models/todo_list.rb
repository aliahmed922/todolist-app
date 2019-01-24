class TodoList < ApplicationRecord
  def humanize_added_on
    created_at.strftime('%d %b, %y')
  end
end
