
const DateFormat = {
    getDayOfWeek: function(date) {
        var year = date.getYear();
        var month = date.getMonth();
        var day = date.getDay();
        var t = [0, 3, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4];
        var tempYear = year;
        tempYear -= ((month < 3) ? 1 : 0);
        var dow = Math.floor(tempYear + tempYear / 4 - tempYear/100 + tempYear/400 + t[month-1] + day) % 7;
        var dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
        return dayOfWeek[dow];

    },

    getMonth: function(date) {
        var month = date.getMonth()-1;
        var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        return months[month];
    },

    globalPrintingDate: function(date) {
        return DateFormat.getDayOfWeek(date) + " " + date.getDay() + " " + DateFormat.getMonth(date) + " " + date.getYear();
    },

    globalPrintingTime: function(date) {
        var minute = date.getMinute() + "";
        if (minute.length == 1) minute = "0" + minute;

        var second = date.getSecond() + "";
        if (second.length == 1) second = "0" + second;

        return date.getHour() + ":" + minute + ":" + second;
    },

    americanPrintingDate: function(date) {
        return DateFormat.getDayOfWeek(date) + " " + DateFormat.getMonth(date) + " " + date.getDay()+ " " + date.getYear();
    },

    americanPrintingTime: function(date) {
        var hourIn = date.getHour();
        var pm = false;
        var hour = hourIn % 12;
        if (hour == 0) hour = 12;
        if (hourIn >= 12) pm = true;

        var timeType = pm ? "PM" : "AM";

        var minute = date.getMinute() + "";
        if (minute.length == 1) minute = "0" + minute;

        var second = date.getSecond() + "";
        if (second.length == 1) second = "0" + second;

        return hour + ":" + minute + ":" + second + " " + timeType;
    }
}
module.exports = DateFormat;