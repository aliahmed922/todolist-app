json.extract! todo_list, :id, :text, :completed, :created_at, :updated_at, :humanize_added_on
json.url todo_list_url(todo_list, format: :json)
