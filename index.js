$(function(){

    const dailyBtn = document.getElementById("daily");
    const weeklyBtn = document.getElementById("weekly");
    const  monthlyBtn = document.getElementById("monthly");
    const currentHours = document.querySelectorAll(".current-hours");
    const prevHours = document.querySelectorAll(".prev-hours");

  
    fetch("./data.json")
    .then(response => response.json())
    .then(data => {
        timePopulator(data,"daily");
        $(dailyBtn).click((e)=>{
            timePopulator(data,"daily");
            dailyBtn.classList.remove("fOpacity")
        })
        $(weeklyBtn).click((e)=>{
            timePopulator(data,"weekly");
            weeklyBtn.classList.remove("fOpacity")
        })
        $(monthlyBtn).click((e)=>{
            timePopulator(data,"monthly");
            monthlyBtn.classList.remove("fOpacity")
           
        })
        $(document).click((e)=>{
            removeButtonFocus(dailyBtn,e)
            removeButtonFocus(weeklyBtn,e)
            removeButtonFocus(monthlyBtn,e)
        })
        
    }
    )
    .catch((err)=>{
        return err;
    })

   function timePopulator(datasource, interval){

     let currentTimeArray = datasource.map((value)=>{
        return value.timeframes[interval].current;
    })

    currentHours.forEach((currentHour,index)=>{
        if(index < currentTimeArray.length){
            currentHour.textContent = currentTimeArray[index] + "hrs";
        }
    })
     let prevTimeArray = datasource.map((value)=>{
        return value.timeframes[interval].previous;
    })
    prevHours.forEach((prevHour ,index)=>{
        if(index< prevTimeArray.length){
            prevHour.textContent = prevTimeArray[index] + "hrs";
        }
    })

   }
  
   function removeButtonFocus(button,e){
    if(!button.contains(e.target) && e.target.id !==`${button.getAttribute("id")}`){
        button.classList.add("fOpacity");
    }
   }
})