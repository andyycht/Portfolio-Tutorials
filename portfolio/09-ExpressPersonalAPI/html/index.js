
const greeting = document.getElementById('greeting');//takes the paragraph IN the html file by Id
const form = document.getElementById('nameForm');
const input = document.getElementById('name');


  form.addEventListener('submit', async (e) => {
    e.preventDefault(); 
    const nombre = input.value;
    const response = await fetch(`/greet?name=${encodeURIComponent(nombre)}`);
    const data = await response.json();

  greeting.textContent = 'Hola '; 

for (let i = 0; i < data.length; i++) { //creates a link for each name in the array
   
    const name = data[i];
    const link = document.createElement('a'); //crates the link elmeent
    link.href = "html/wazzup.html?name=" + encodeURIComponent(name); //asings the URL to the link
    link.textContent = name; //sets the name to the text of the link
    greeting.appendChild(document.createTextNode(',')); //adds a comma before each name
    greeting.appendChild(link);
    
}
form.reset();
});

  const form_task = document.getElementById('taskForm'); //gets the form
  const tasklist = document.getElementById('TODO_list'); //gets the list where the tasks will be added

  form_task.addEventListener('submit', async (e) => { //the client interferes with the form submission so that the page doesn't refresh
  e.preventDefault(); //the page doesn't refresh
  const formData = new FormData(form_task);//reads ALL the input from the form(la task completa)

  const response = await fetch('/task', { //the client sends the form data to the server
    method: 'POST',
    body: new URLSearchParams(formData)
  });

    const data = await response.json(); //when the server responds, the client reads the response and save it as a js object (data)

    const li = document.createElement('li');//creates a list item
    li.textContent = data.newTask; //sets the task from the json object as the text of the list item

  // Delete button
  const deleteBtn = document.createElement('button');  //if the user clicks the button, the item is deleted only from the list
  deleteBtn.textContent = 'delete';
  deleteBtn.addEventListener('click', async () => {
    const index = Array.from(tasklist.children).indexOf(li);//gets the index of the deleted item by converting the HTMLCollection of the list to an array (listelement[1], listelement[2], etc.)
    const response = await fetch(`/task/${index}`, { method: 'DELETE' });//makes the request to the server to delete the task
    const result = await response.json(); //when the server responds, the client reads the response and save it as a js object (result)
    li.remove();
  });

  // Up button
  const upBtn = document.createElement('button'); //if the user clicks the button, the item moves up one position in the list
  upBtn.textContent = '⬆️';
  upBtn.addEventListener('click', () => {
    const prev = li.previousElementSibling; //gets the previous element in the list
    tasklist.insertBefore(li, prev); //this methods moves the previous element before the current one
  });

  // Down button
  const downBtn = document.createElement('button'); //does the same thing as the up button but down
  downBtn.textContent = '⬇️';
  downBtn.addEventListener('click', () => {
    const next = li.nextElementSibling;
    tasklist.insertBefore(next, li);
  });

    li.appendChild(deleteBtn); //adds the buttons to the list item
    li.appendChild(upBtn); 
    li.appendChild(downBtn);
    tasklist.appendChild(li); //adds the list item to the list
    form_task.reset(); //resets the form so that the user can enter a new task

  });