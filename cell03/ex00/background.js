const button = document.getElementById('colorChangeBtn');
const body = document.body;

function getRandomHexColor() {
  const randomColor = Math.floor(Math.random() * 16777215);
  return "#" + randomColor.toString(16).padStart(6, "0");
}

button.addEventListener('click', () => {
  body.style.backgroundColor = getRandomHexColor();
});
