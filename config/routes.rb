Rails.application.routes.draw do
  resources :todo_lists do
    put :mark_all, on: :collection
  end
  
  root to: 'todo_lists#index'
end
