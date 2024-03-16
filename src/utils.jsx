import moment from "moment";
import {useEffect, useState} from "react";

function formEventToJson(event) {
    const data = new FormData(event.target);
    const json = {};
    data.forEach((value, key) => {
            json[key] = value;
        }
    );
    return json;
}

function getRelativeTime(dateTimeStr) {
    const currentTime = moment();
    const pastTime = moment(dateTimeStr);
    const duration = moment.duration(currentTime.diff(pastTime));

    const years = duration.years();
    const months = duration.months();
    const days = duration.days();
    const hours = duration.hours();
    const minutes = duration.minutes();
    const seconds = duration.seconds();

    if (years > 0) {
        return `${years}y ago`;
    } else if (months > 0) {
        return `${months}mo ago`;
    } else if (days > 0) {
        return `${days}d ago`;
    } else if (hours > 0) {
        return `${hours}hr ago`;
    } else if (minutes > 0) {
        return `${minutes}m ago`;
    } else {
        return `${seconds}s ago`;
    }
}

function isOnline(dateTimeStr) {
    const currentTime = moment();
    const pastTime = moment(dateTimeStr);
    const duration = moment.duration(currentTime.diff(pastTime));
    return duration.asMinutes() < 5;
}


function RelativeTimeDisplay({dateTimeStr}) {
    const [relativeTime, setRelativeTime] = useState('');

    useEffect(() => {
        const interval = setInterval(() => {
            setRelativeTime(getRelativeTime(dateTimeStr));
        }, 1000); // Update every second

        return () => clearInterval(interval); // Clean up the interval on unmount
    }, [dateTimeStr]);

    return <>{relativeTime}</>;
}


function getFormattedDateTime() {
    const currentDateTime = new Date();
    const year = currentDateTime.getFullYear();
    const month = String(currentDateTime.getMonth() + 1).padStart(2, '0');
    const day = String(currentDateTime.getDate()).padStart(2, '0');
    const hours = String(currentDateTime.getHours()).padStart(2, '0');
    const minutes = String(currentDateTime.getMinutes()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;

    return `${month}-${day}-${year} ${formattedHours}:${minutes}${ampm}`;
}

export {
    formEventToJson,
    getRelativeTime,
    RelativeTimeDisplay,
    isOnline,
    getFormattedDateTime,
}