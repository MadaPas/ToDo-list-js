const todos = document.querySelector('.todo-list');
const addTodoForm = document.querySelector('.add');

const items = JSON.parse(localStorage.getItem('todos')) || [];

const listHtml = (list = [], myList) => {
  const target = myList;
  target.innerHTML = list.map((item, i) => `
    <li>
      <input type="checkbox" id="todo${i}" data-index="${i}" ${item.done ? 'checked' : ''} />
        <label  class="this-li" for="todo${i}"><p>${item.name}</p>
        <button class="delete-one" data-index="${i}">Delete <i class="fas fa-trash-alt"></i></button>
        </label>
    </li>
    `).join('');
  return target;
};

const updateLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(items));
  listHtml(items, todos);
};

const markAsDone = (item) => {
  const listElement = item.target;
  const {
    index,
  } = listElement.dataset;
  items[index].done = !items[index].done; //  switching from true to false onClick
  updateLocalStorage();
};

const deleteOne = (item) => {
  if (!item.target.matches('.delete-one')) return;
  const listElement = item.target;
  const {
    index,
  } = listElement.dataset;
  items.splice(index, 1);
  updateLocalStorage();
};

function addNewTodo() {
  const name = (this.querySelector('[name=item]')).value;
  const newTodo = {
    name,
    done: false,
  };
  items.push(newTodo);
  updateLocalStorage();
  this.reset();
}

addTodoForm.addEventListener('submit', addNewTodo);
todos.addEventListener('click', markAsDone);
todos.addEventListener('click', deleteOne);

listHtml(items, todos);
