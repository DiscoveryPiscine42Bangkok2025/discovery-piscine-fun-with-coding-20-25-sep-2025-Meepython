// ----- cookie helpers (same idea, jQuery not needed here) -----
const COOKIE_NAME = "todos";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

function readTodos() {
  const m = document.cookie.split("; ").find(c => c.startsWith(COOKIE_NAME + "="));
  if (!m) return [];
  try { return JSON.parse(decodeURIComponent(m.split("=")[1])); }
  catch { return []; }
}

function writeTodos(list) {
  const v = encodeURIComponent(JSON.stringify(list));
  document.cookie = `${COOKIE_NAME}=${v}; Max-Age=${COOKIE_MAX_AGE}; Path=/`;
}

// ----- state -----
let todos = readTodos();

// ----- render helpers -----
function makeTodoEl(text, idx) {
  const $div = $('<div/>', { 'class': 'todo', text });
  // click-to-delete with confirm
  $div.on('click', function () {
    if (confirm('Remove this TO DO?')) {
      todos.splice(idx, 1);
      writeTodos(todos);
      render(); // re-render to update indices
    }
  });
  return $div;
}

function render() {
  const $list = $('#ft_list').empty();
  // newest first → iterate from end and prepend OR just build descending
  for (let i = todos.length - 1; i >= 0; i--) {
    $list.append(makeTodoEl(todos[i], i));
  }
}

function addTodo(text) {
  if (!text) return;
  todos.push(text.trim());     // keep newest at the end in state
  writeTodos(todos);
  render();                    // UI shows newest on top
}

// ----- wiring -----
$(function () {
  $('#newBtn').on('click', function () {
    const t = prompt('Enter a new TO DO:');
    if (t && t.trim() !== '') addTodo(t);
  });

  render(); // initial paint from cookie
});
