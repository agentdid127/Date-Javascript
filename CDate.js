const DateUtil = require("./DateUtil")
class CDate {
    constructor(year = 1970, month = 1, day = 1, hour = 0, minute = 0, second = 0, milli = 0) {
        this.year = parseInt(year);
        this.month = parseInt(month);
        this.day = parseInt(day);
        this.hour = parseInt(hour);
        this.minute = parseInt(minute);
        this.second = parseInt(second);
        this.milli = parseInt(milli);
    }

    isLeapYear() {
        return DateUtil.CDate.isLeapYear(this.year);
    }

    getDaysInMonth() {
        return DateUtil.CDate.getDaysInMonth(this.month, this.year);
    }

    formattedSum(date) {
        var yearOut = this.year + date.year;
        if (this.year > 0 && this.year + date.year <= 0) yearOut -= 1;
        else if (this.year < 0 && this.year + date.year >= 0) yearOut += 1;
        return DateUtil.CDate.reformatDate(new CDate(yearOut, this.month + date.month, this.day + date.day, this.hour + date.hour, this.minute + date.minute, this.second + date.second, this.milli + date.milli));
    }

    sum(date) {
        return new CDate(this.year + date.year, this.month + date.month, this.day + date.day, this.hour + date.hour, this.minute + date.minute, this.second + date.second, this.milli + date.milli)
    }

    formattedDiff(date) {
        var yearOut = this.year - date.year;
        if (this.year > 0 && this.year - date.year <= 0) yearOut -= 1;
        else if (this.year < 0 && this.year - date.year >= 0) yearOut += 1;
        return DateUtil.CDate.reformatDate(new CDate(yearOut, this.month - date.month, this.day - date.day, this.hour - date.hour, this.minute - date.minute, this.second - date.second, this.milli - date.milli));
    }

    diff(date) {
        return new CDate(this.year - date.year, this.month - date.month, this.day - date.day, this.hour - date.hour, this.minute - date.minute, this.second - date.second, this.milli - date.milli)
    }

    localDate(offset) {
        var hour = Math.floor(offset);
        var minute = Math.floor((offset-hour) * 60);

        return this.formattedSum(new CDate(0, 0, 0, hour, minute, 0, 0));
    }

    getValue(intIn, length) {
        var int = intIn + "";
        var out = "";
        if (int.length < length) {
            var l = length - int.length;
            for(var i = 0; i < l; i++) {
                out += "0";
            }
        }
        out += int;
        return out;
    }
    

    getYear() {
        return this.year;
    }

    getMonth() {
        return this.month;
    }

    getDay() {
        return this.day;
    }

    getHour() {
        return this.hour;
    }

    getMinute() {
        return this.minute;
    }
    
    getSecond() {
        return this.second;
    }

    getMilli() {
        return this.milli;
    }

    toString() {
        return (this.year + ":" + this.getValue(this.month, 2) + ":" + this.getValue(this.day, 2) + ":" + this.getValue(this.hour, 2) + ":" + this.getValue(this.minute, 2) + ":" + this.getValue(this.second, 2) + ":" + this.getValue(this.milli, 3));
    }
}

module.exports = CDate;