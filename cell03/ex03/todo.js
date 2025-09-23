// ----- cookie helpers -----
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

// ----- DOM refs -----
const listEl = document.getElementById("ft_list");
const newBtn = document.getElementById("newBtn");

// keep an array of strings (newest last for simple push/pop)
// we render with column-reverse so newest shows on top as required
let todos = readTodos();

// render all todos into #ft_list
function render() {
  listEl.innerHTML = "";
  todos.forEach((text, idx) => {
    const div = document.createElement("div");
    div.className = "todo";
    div.textContent = text;

    div.addEventListener("click", () => {
      if (confirm("Remove this TO DO?")) {
        // remove from array and update cookie + DOM
        todos.splice(idx, 1);
        writeTodos(todos);
        render();
      }
    });

    listEl.appendChild(div);
  });
}

// add new todo (top of list visually)
function addTodo(text) {
  if (!text) return;
  todos.push(text.trim());           // push to keep newest last
  writeTodos(todos);
  render();                          // column-reverse makes it appear on top
}

newBtn.addEventListener("click", () => {
  const t = prompt("Enter a new TO DO:");
  if (t && t.trim() !== "") addTodo(t);
});

// initial paint from cookie
render();
