import { Controller } from "stimulus";
import Rails from "rails-ujs";

export default class extends Controller {
  static targets = [ "input", "itemsList", "removeItem" ]
  
  connect() {
  }
  
  addTodo(e) {
    if (e.which === 13) {
      let text = e.target.value;
      let data = new FormData();
      data.set('todo_list[text]', text);
      Rails.ajax({
        url: '/todo_lists',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: (listItem) => {
          this.itemsListTarget.innerHTML += this.appendListItem(listItem);
        },
        error: () => { console.log('Error') }
      });
    }
  }
  
  removeItem(e) {
    e.preventDefault();
    let element    = e.currentTarget;
    let listItemId = element.getAttribute('data-item-id');
    Rails.ajax({
      url: '/todo_lists/' + listItemId,
      type: 'DELETE',
      dataType: 'json',
      success: (item) => {
        element.closest("li").remove();
      },
      error: () => { console.log('Error') }
    });
  }
  
  markAsCompleted(e) {
    e.preventDefault();
    let element    = e.currentTarget;
    let listItemId = element.value;
    let data       = new FormData();
    data.set('todo_list[completed]', element.checked);
    Rails.ajax({
      url: '/todo_lists/' + listItemId,
      type: 'PUT',
      dataType: 'json',
      data: data,
      success: () => {
        if (element.checked) {
          element.closest("li").classList.add('todolist--list__completed-item');
        } else {
          element.closest("li").classList.remove('todolist--list__completed-item');
        }
      },
      error: () => { console.log('Error') }
    });
  }
  
  appendListItem(listItem) {
    return `
      <li class="ui-state-default">
        <div class="checkbox">
          <label>
            <input type="checkbox" value="${item.id}" data-action="change->todolist#markAsCompleted" /> ${listItem.text}
          </label>
          <a href="#" class="float-right mt-1" data-action="click->todolist#removeItem" data-item-id="${listItem.id}">
            <i class="fas fa-times"></i>
          </a>
        </div>
      </li>
    `;
  }
}
