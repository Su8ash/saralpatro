import React, { useEffect, useState } from 'react';
import './Calendar.css';

const Calendar = () => {

    const apiEndPoint = async () => {


        console.log("called")

        var axios = require('axios');
        var data = JSON.stringify({
            query: `{
                        dates(bsYear: ${selectedYear}, bsMonth: ${selectedMonth}) {
                            bsDayNp
                            bsDay
                            adDay
                            bsMonth
                            bsMonthNp
                            weekday
                            bsYear
                            bsYearNp
                            adYear
                            isHoliday
                            weekdayStrNp
                            weekdayStrEn
                            adMonthStrEn
                            adMonth
                            bsMonthStrNp
                            bsMonthStrEn
                            bsMonth
                            weekdayStrNp
                            events {
                                strEn
                                strNp
                                isHoliday
                            }
                            tithiCode
                            tithiStrNp
                            tithiStrEn
                        }
                    }`,
            // variables: {}
        });

        var config = {
            method: 'post',
            url: 'https://api.saralpatro.com/graphql',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

       await axios(config)
            .then(function (response) {
                // setApi(response.data.data['dates']);
                setCurrentDays(response.data.data['dates']);
                
                console.log(response.data);
                setcurrentIndex(response.data.data['dates'][0].weekday);
                console.log(response.data);
                setIsLoading(false);
            })

            console.log("Dey Dana done")

        return "done";
    }






    // const currentDays = [];

    const [currentDays, setCurrentDays] = useState([]);
    const [currentIndex, setcurrentIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const months = ['वैशाख', 'जेष्ठ', 'असार', 'श्रावण', 'भदौ', 'आश्विन', 'कार्तिक', 'मंसिर', 'पौष', 'माघ', 'फाल्गुण', 'चैत्र']
    const years = [];

    const ENG_DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const NEP_DAYS = ['आइत', 'सोम', 'मंगल', 'बुध', 'बिही', 'शुक्र', 'शनि'];

    const [selectedMonth, setSelectedMonth] = useState(1);
    const [selectedYear, setSelectedYear] = useState(2078);


    const handleMonthChange = (e) => {
        console.log(e.target.value);
        setSelectedMonth(e.target.value);
        
    }

    const handleYearChange = (e) => {
        console.log(e.target.value);
        setSelectedYear(e.target.value);
    }


    for (let year = 1975; year < 2100; year++) {
        years.push(year)
    }


    useEffect(() => {
        setIsLoading(true);

        apiEndPoint();

    }, [selectedMonth, selectedYear,])



    let daysBeforeStart = [];
    // let currentIndex = currentDays[0].weekday;



    for (let i = 0; i < currentIndex+1 && currentIndex < 6; i++) {
        daysBeforeStart.push(<td className="calendar-day" key={`empty${i}`}>{""}</td>);
    }


    let daysInMonth = [];
    for (let index = 0; index < currentDays.length; index++) {
      let currentDay = index === 6 ? "today" : "";
    //   let selectedClass = (index === this.state.selectedDay ? "selected-day" : "others")
        let selectedClass = 'selected';
        
      let holiday = currentDays[index].weekdayStrNp === "शनिबार" ? "holiday" : "otherday";
        

      daysInMonth.push(
          <td key={`index${index}`} className='calendar-day'>
              

                
                  <div style={{
                    textAlign: 'left', position:'relative',


                  }}>
                      
                <span className="tithi">
                    {currentDays[index].tithiStrNp}
                </span>

                <span className="eng-date">
                    {currentDays[index].adDay}
                </span>
                  </div>


              <div style={{ height:'100%', display:'flex', justifyContent:'center', alignItems:'center'}}
            className={`${currentDay} ${selectedClass}`}
          
            onClick={e => {
              this.onDayClick(e, index);
            }}
              >


                  

            <h2 className={holiday} style={{textAlign:'center'}}
          >
            {currentDays[index].bsDayNp}
                  </h2>
          </div>
        </td>
      );
    }


       var totalDaysInMonth = [...daysBeforeStart, ...daysInMonth];
    let weekdaysRow = [];
    let days = [];

    totalDaysInMonth.forEach((row, i) => {
      if (i % 7 !== 0) {
        days.push(row);
      } else {
        weekdaysRow.push(days);
        days = [];
        days.push(row);
      }
      if (i === totalDaysInMonth.length - 1) {
        // let insertRow = days.slice();
        weekdaysRow.push(days);
      }
    });

    let daysinmonth = weekdaysRow.map((d, i) => {
      return <tr key={i}>{d}</tr>;
    });



    
    return (
        <div className="mainContainer">
            { isLoading?<h6 style={{textAlign:'center'}}>Loading ...</h6>:<p></p> }
            <h1 className="header">Saral Patro </h1>
            <div className="sub-header">
                <div className="flex-d">
                    <h2>{ months[selectedMonth-1]+", "+ selectedYear}</h2>
                </div>
                <div>
                    <span className="options">
                        <label htmlFor="years">वर्ष रोज्नुहोस्:</label>
                        <select name="years" id="years" className="selectOption" value={selectedYear} onChange={handleYearChange} >
                            {
                                years.map((item, index) => <option value={item} key={index}>{ item }</option>)
                            }
                        </select>
                        </span>
                    <span className="options">
                        <label htmlFor="months">महिना रोज्नुहोस्:</label>
                        <select name="months" id="months" className="selectOption" value={selectedMonth} onChange={handleMonthChange}>
                            {
                                months.map((item, index) => <option value={index+1} key={index}>{ item }</option>)
                            }
                            </select>
                    </span>
                </div>
            </div>
{/*             
            {
                currentDays.map((item, index) => <div>
                    {item.bsDayNp}
                </div>)
            } */}

        <table style={{
            width: '100%',
            padding: "10px",
            borderRadius:'12px',
            // boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
          }}>
              <thead style={{margin:"20px 20px"}}>
                <tr className="weekdays">
                {ENG_DAYS.map((item, index) => <th key={index} style={{borderTop:'1px solid #dee2e6'}}> {item}</th>)}
              </tr>
              <tr className="weekdays">
                {NEP_DAYS.map((item, index) => <th key={index}> {item}</th>)}
                </tr>
                </thead>
                <tbody>
                        {
                            daysinmonth
                        }
            </tbody>

            </table>

        </div>
    )
}

export default Calendar
