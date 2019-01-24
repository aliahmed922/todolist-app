import { Controller } from "stimulus";
import Rails from "rails-ujs";
import TotalListCountObserver from './observers/total_list_count_observer';

export default class extends Controller {
  static targets = [ "input", "itemsList", "removeItem", "totalItemsCount" ]
  
  connect() {
    TotalListCountObserver.monitor(this.itemsListTarget, this.totalItemsCountTarget);
  }
  
  disconnect() {
    TotalListCountObserver.forget();
  }
  
  addTodo(e) {
    if (e.which === 13) {
      let element = e.target
      let text    = element.value;
      let data    = new FormData();
      data.set('todo_list[text]', text);
      Rails.ajax({
        url: '/todo_lists',
        type: 'POST',
        data: data,
        dataType: 'json',
        success: (listItem) => {
          this.itemsListTarget.innerHTML = this.newListItem(listItem) + this.itemsListTarget.innerHTML;
          element.value = "";
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
  
  markAllAsCompleted(e) {
    e.preventDefault();
    let element    = e.currentTarget;
    let data       = new FormData();
    data.set('todo_list[mark_all_as_completed]', true);
    Rails.ajax({
      url: '/todo_lists/mark_all',
      type: 'PUT',
      dataType: 'json',
      data: data,
      success: () => {
        for(let listItem of this.itemsListTarget.querySelectorAll('li')) {
          listItem.classList.add('todolist--list__completed-item');
          listItem.querySelector("input[type='checkbox']").checked = true;
        }
      },
      error: () => { console.log('Error') }
    });
  }
  
  newListItem(listItem) {
    return `
      <li class="ui-state-default">
        <div class="checkbox">
          <label>
            <input type="checkbox" value="${listItem.id}" data-action="change->todolist#markAsCompleted" /> ${listItem.text}
          </label>
          <a href="#" class="float-right mt-1" data-action="click->todolist#removeItem" data-item-id="${listItem.id}">
            <i class="fas fa-times"></i>
          </a>
          <label class="float-right todolist--list__created-at">
            (${listItem.humanize_added_on})
          </label>
        </div>
      </li>
    `;
  }
}
