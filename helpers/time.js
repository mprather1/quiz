var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

var time = {
  leadingZero: function(a){
    if(a < 10){
      return "0" + a;
    } else {
      return a;
    }
  },
  day: function(d){
    return days[d.getDay()];
  },
  hour: function(d){
    var hours = d.getHours();
    if(hours === 0){
      hours = 12;
    } 
    if (hours > 12){
      hours = hours - 12;
    }
    if (hours < 10){
      return "0" + hours
    } else {
      return hours
    }
  },
  minute: function(d){
    return this.leadingZero(d.getMinutes());
  },
  second: function(d){
    return this.leadingZero(d.getSeconds());
  },
  ampm: function(d){
    return d.getHours() < 12 ? "AM":"PM";
  },
  date: function(d){
    return d.getDate();
  },
  month: function(d){
    return months[d.getMonth()];
  },
  year: function(d){
    return d.getFullYear();
  },
  currentTime: function(d){
    return this.hour(d) + ":" + this.minute(d) + ":" + this.second(d) + " " + this.ampm(d);
  },
  currentDate: function(d){
    return this.day(d) + ", " + this.month(d) + " " + this.date(d) + ", " + this.year(d);
  }
};

module.exports = time;