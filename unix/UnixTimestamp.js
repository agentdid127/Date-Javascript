const UnixFormat = require("./UnixFormat");
const CDate = require("../CDate");
const DateFormat = require("../DateFormat");
const UnixSupportedDate = require("./UnixSupportedDate.js");
const DateUtil = require("../DateUtil");
const UnixUtils = require("./UnixUtils");
class UnixTimestamp {
    
    constructor(longIn, format) {
        this.data = longIn;
        this.format = format;
    }

    toDate() {
        var milli;
        if (this.format == UnixFormat[0]) {
            milli = this.data * 1000;
        }
        else if (this.format == UnixFormat[1]) {
            milli = this.data;
        }

        var second = 0;
        var milli_correct = milli / 1000.0;
        milli = milli % 1000;
        second += Math.floor(milli_correct);

        var minute = 0;
        var second_correct = second / 60.0;
        second = second % 60;
        minute += Math.floor(second_correct);

        var hour = 0;

        var minute_correct = minute / 60.0;
        minute = minute % 60;
        hour += Math.floor(minute_correct);

        var day = 0;

        var hour_correct = hour / 24.0;
        hour = hour % 24;
        day += Math.floor(hour_correct);
        
        var month = 0;
        var yCycle = 1;
        var mCycle = 1;
            while (day > DateUtil.CDate.getDaysInMonth(mCycle, yCycle)) {
                day -= DateUtil.CDate.getDaysInMonth(mCycle, yCycle);
                mCycle++;
                month++;
                if (mCycle > 12) {
                    yCycle++;
                    mCycle = 1;
                }
                if (yCycle > 4) yCycle = 1;
            }
            while (day <= 0) {
                day += DateUtil.CDate.getDaysInMonth(mCycle, yCycle);
                mCycle--;
                month--;
                if (mCycle < 1) {
                    yCycle--;
                    mCycle = 12;
                }
                if (yCycle < 1) yCycle = 4;
            }
            month++;

        var year = 1970;
        
        var month_correct = (month -1) / 12.0;
        month = (month -1) % 24 + 1;
        year += Math.floor(month_correct);


        if (year % 4 > 0 && year > 1970) day++;
        if (year % 4 != 1 && year < 1970) day++;
        if (year <= 0) year--;
        
        return UnixUtils.UnixSupportedDate.dateFromString(DateUtil.CDate.reformatDate(new CDate(year, Math.floor(month), Math.floor(day), Math.floor(hour), Math.floor(minute), Math.floor(second), Math.floor(milli))).toString());
    }

    getData() {
        return this.data;
    }

    getFormat() {
        return this.format;
    }

    toString() {
        return this.data.toString();
    }

    toJSDate() {
        var datan = this.data;
        if (this.format == UnixFormat[0]) {
            datan *= 1000;
        }
        return new Date(datan);
    }
}

module.exports = UnixTimestamp;