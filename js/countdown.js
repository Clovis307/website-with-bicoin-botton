class CountDown {

    constructor({end_countdown_date, parent_element}) {
        this.end_countdown_date = end_countdown_date;
        this.parent_element = parent_element;
        this.CountDown_completed = false;
        this.milliseconds_to = {
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 86400000
        };
        this.init();

}

init() {
    Object.freeze(this.milliseconds_to);


    this.createCountDownElement();

    this.updateCountDownElements();

    const countdown = setInterval(() => !this.CountDown_completed ? this.updateCountDownElements() : clearInterval(countdown), 1000 );

}


createCountDownElement() {

    this.section_element = document.createElement('section');
    this.section_element.id = "countdown";
    this.section_element.innerHTML =`
        <span data-unit="day" data-unit-name="jours"></span>
        <span data-unit="hours" data-unit-name="hours"></span>
        <span data-unit="minutes" data-unit-name="minutes"></span>
        <span data-unit="seconds" data-unit-name="seconds"></span>

    `;
    
    this.parent_element.appendChild(this.section_element);
    





}

updateCountDownElements() {
    [...this.section_element.children].forEach(span_element => span_element.textContent = this.getStringValueFormatted(span_element.dataset.unit));
}

getStringValueFormatted(unit){

    const milliseconds_remaining = new Date(this.end_countdown_date) - new Date();
    
    if (milliseconds_remaining <= 1000) {
        this.end_countdown_completed = true;
    }

    let value = null

    switch(unit) {
        case "day": value = Math.floor(milliseconds_remaining / this.milliseconds_to.day); break;
        case "hour": value = Math.floor(milliseconds_remaining % this.milliseconds_to.day) / this.milliseconds_to.hour; break;
        case "minute": value = Math.floor((milliseconds_remaining % this.milliseconds_to.hour) / this.milliseconds_to.minute); break;
        case "second": value = Math.floor(milliseconds_remaining % this.milliseconds_to.minute) / this.milliseconds_to.second; break;
    }

    //console.log(value < 9 ? value: "0" + value);

    return (value < 9 ? value: "0" + value).toString();

     } 

}