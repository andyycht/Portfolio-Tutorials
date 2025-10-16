const form = document.querySelector('#weekly-schedule-forms form');
const table = document.querySelector('#weekly-schedule table');
const inputDate = document.getElementById('date');
const inputStart = document.getElementById('time_start');
const inputEnd = document.getElementById('time_end');
const inputActivity = document.getElementById('activity');
const inputPlace = document.getElementById('place');
const selectType = document.getElementById('type');
const textareaNotes = document.querySelector('[name="notes"]');
const inputColor = document.getElementById('color');
const inputBusy = document.getElementById('busy_or_free');

form.addEventListener('submit', function (e) {
    e.preventDefault();
  agregarEventoATabla();
});

function agregarEventoATabla() {

    const fecha = inputDate.value;
  const inicio = inputStart.value;
  const fin = inputEnd.value;
  const actividad = inputActivity.value;
  const lugar = inputPlace.value;
  const tipo = selectType.value;
  const notas = textareaNotes.value;
  const colorFlag = inputColor.value;
  const esBusy = inputBusy.checked;

  //creates a row and an element to add the image according to the checkbox
  const tr = document.createElement('tr');
  const td = document.createElement('td');
  const img = document.createElement('img');
  img.width = 50;
  img.alt = esBusy ? 'Busy' : 'Free';
  img.src = esBusy ? 'Images/busy.png' : 'Images/free.png';
  td.appendChild(img);
  tr.appendChild(td);

  //function that creates a td
  const crearTd = text => {
    const td = document.createElement('td');
    td.textContent = text;
    return td;
  };

  //adds form data to the table
  tr.appendChild(crearTd(fecha));
  tr.appendChild(crearTd(inicio));
  tr.appendChild(crearTd(fin));
  tr.appendChild(crearTd(actividad));
  tr.appendChild(crearTd(lugar));
  tr.appendChild(crearTd(tipo));
  tr.appendChild(crearTd(notas));

  //adds the color box
  const tdColor = document.createElement('td');
  const colorBox = document.createElement('div');
  colorBox.style.width = '20px';
  colorBox.style.height = '20px';
  colorBox.style.border = '1px solid #ccc';
  colorBox.style.borderRadius = '3px';
  colorBox.style.backgroundColor = colorFlag;
  tdColor.appendChild(colorBox);
  tr.appendChild(tdColor);

  //assigns the table body to a variable and creates it if it doesn't exist
  let tbody = table.querySelector('tbody');
  if (!tbody) {
    tbody = document.createElement('tbody');
    table.appendChild(tbody);
  }
  
  tbody.appendChild(tr);

  form.reset();
  inputDate.focus();
}
