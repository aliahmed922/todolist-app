puts "Creating Todo List"
[
  { text: 'Refactor drapers code', completed: false },
  { text: 'Resolve conflicts from master branch', completed: false },
  { text: 'Integrate StimulasJs', completed: false },
  { text: 'Use Bootstrap 4', completed: false },
].each do |item|
  TodoList.find_or_create_by!(item)
end