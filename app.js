const main = document.querySelector('main');
const dateInput = document.querySelector('.select-date');
const calendar = document.createElement('div');
const dateGrid = document.createElement('div');

const getMonth = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


//get the dates
const currDay = new Date().getDate();
const currMonth = new Date().getMonth();
const currYear = new Date().getFullYear();

let month = currMonth;
let year = currYear;


function createCalendar(){
    //create the HTML
    calendar.innerHTML = `
        <div class="month-indicator">
            <div class="prev-btn">&lt;</div>
            <h1>${getMonth[month]} ${year}</h1>
            <div class="next-btn">&gt;</div>
        </div>
        <div class="day-of-week">
            <div>Su</div>
            <div>Mo</div>
            <div>Tu</div>
            <div>We</div>
            <div>Th</div>
            <div>Fr</div>
            <div>Sa</div>   
        </div>
    `
    calendar.classList.add('calendar');
    main.appendChild(calendar);

    dateGrid.classList.add('date-grid');
    calendar.appendChild(dateGrid);


    const prevBtn = calendar.querySelector('.prev-btn');
    const nextBtn = calendar.querySelector('.next-btn');

    function move(direction) {
        if(direction === 'back') {
            month--;

            if(month < 0 ){
                month = 11;
                year--;
            }
        } else {
             month++;

            if(month > 11 ){
                month = 0;
                year++;
            }
        }

        generateDates(month, year); //will update the dates

    }

    generateDates(month, year);
     
    //event listeners
    prevBtn.addEventListener('click', () => move('back'));
    nextBtn.addEventListener('click', move);

}

function generateDates(month, year, selectedDate){
    if(dateGrid.innerHTML !== ''){
        // Clear previous dates
        dateGrid.innerHTML = '';
    }

    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let day = 1; day <= daysInMonth; day++) {
        const dateBtn = document.createElement('button');
        dateBtn.innerHTML = `<time datetime="${year}-${month}-${day}">${day}</time>`

        // Add a CSS class to the button element for the current day
        if (day === currDay && month === currMonth && year === currYear) {
            dateBtn.classList.add('today');
        }

        if(selectedDate 
            && selectedDate.day === day
            && selectedDate.month === month
            && selectedDate.year === year
        ) {
            dateBtn.classList.add('is-selected');
            console.log('selection added!')
        }
        
        dateGrid.appendChild(dateBtn);
    }

    //update the month and year
    calendar.querySelector('.month-indicator > h1').textContent = `${getMonth[month]} ${year}`;
}

dateInput.addEventListener('click', createCalendar, { once: true });

dateInput.addEventListener('input', (e) => {
    const date = e.target.valueAsDate;
    const selectedDate = {
        day: date.getDate() + 1,
        month: date.getMonth(),
        year: date.getFullYear()
    }

    month = selectedDate.month;
    year = selectedDate.year;
        
    generateDates(month, year, selectedDate);
});
