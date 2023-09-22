//global variables
const newMonsterForm = document.querySelector('#newMonster');
const enterName = document.querySelector('#input1');
const enterAge = document.querySelector('#input2');
const enterDesc = document.querySelector('#input3');
const backArrow = document.querySelector('button#back');
const forwardArrow = document.querySelector('button#forward');
const monstersDiv = document.querySelector('div#monster-container');
const fetchUrl = 'http://localhost:3000/monsters';
let collection = [];
let index = 0;

//helper functions
function fetchAll() {
  fetch(fetchUrl)
    .then(resp => {
      if (!resp.ok) throw new Error('Failed to fetch data.')
      return resp.json()
    })
    .then(allMonsters => {
      collection = [...allMonsters]
      renderFifty()
    })
    .catch(e => alert(e.message))
}

function renderMonster(obj) {
  const div = document.createElement('div');
  const name = document.createElement('h2');
  const age = document.createElement('h3');
  const desc = document.createElement('p');

  name.textContent = obj.name;
  age.textContent = `Age: ${+obj.age.toFixed(1)} yrs`;
  desc.textContent = obj.description;

  div.append(name, age, desc);
  monstersDiv.append(div);
}

function renderFifty() {
  monstersDiv.innerHTML = "";
  for (let i = index; i < index + 50; i++) {
    if (i >= collection.length) return;
    renderMonster(collection[i]);
  }
  index += 50;
}

//event listeners
forwardArrow.addEventListener('click', () => {
  if (monstersDiv.children.length < 50) {
    alert('No mas can go front-o!')
    return;
  }
  renderFifty();
})

backArrow.addEventListener('click', () => {
  if (index <= 50) {
    alert('No mas can go back-o!')
    return;
  }
  index -= 100;
  renderFifty();
})

newMonsterForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const payload = {
    name: newMonsterForm.name.value,
    age: newMonsterForm.age.value,
    description: newMonsterForm.description.value
  }
  fetch(fetchUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify(payload)
  })
  .then(resp => resp.json())
  .then(updatedObj => {
    collection.push(updatedObj)
    newMonsterForm.reset();
  })
})

//function calls
fetchAll()