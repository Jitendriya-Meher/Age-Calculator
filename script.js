

const isFutureDate = (birthDay, currentYear,currentMonth, currentDate)=>{

    return (
        (birthDay.year > currentYear) ||
        ( birthDay.year===currentYear && birthDay.month > currentMonth) || 
        (birthDay.year===currentYear && birthDay.month===currentMonth && birthDay.date > currentDate)
    )
};

const getDaysInMonth = (month, year) => {

    const isLeapYear = year % 4 ===0 && (year %100 !=0 || year %400==0);

    const DaysInMonth = [
        31,
        isLeapYear ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
    ];

    return DaysInMonth[month-1];
}

const displayResult = (day, month,year) => {
    document.getElementById("years").innerHTML = year;
    document.getElementById("months").innerHTML = month;
    document.getElementById("days").innerHTML = day;
}


const clacAge = (birthDay, currentYear,currentMonth, currentDate) =>{

    let years = currentYear- birthDay.year;
    let months , days;

    if( currentMonth < birthDay.month){
        years--;
        months = 12 - (birthDay.month - currentMonth);
    }else{
        months = currentMonth - birthDay.month;
    }

    if( currentDate < birthDay.date){
        months--;
        const lastMonth = currentMonth === 1 ? 12 : currentMonth - 1;
        const daysInLastMonth = getDaysInMonth(lastMonth, currentYear);

        days = daysInLastMonth - (birthDay.date - currentDate);

    }else{
        days = currentDate - birthDay.date;
    }

    console.log({years, months, days});
    return {years, months, days};
}


const ageCalculate = ()=>{
    const today = new Date();
    const inputDate = new Date( document.querySelector("#date").value);

    const birthDay = {
        date : inputDate.getDate(),
        month : inputDate.getMonth() + 1,
        year : inputDate.getFullYear()
    };

    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDate = today.getDate();

    console.log(birthDay, currentMonth, currentDate,currentYear);

    if( isFutureDate(birthDay, currentYear,currentMonth, currentDate)){
        alert("Not Born Yet");
        displayResult("-","-","");
        return;
    }

    const {years, months, days} = clacAge(birthDay, currentYear, currentMonth, currentDate);

    displayResult(days,months,years);

};

const ageBtn = document.querySelector("#ageBtn");

ageBtn.addEventListener("click", ageCalculate);