import { TextField } from "@mui/material"
import { useState } from "react"

export default function TimeInput({ label, value, onChange }) {
    const [yearError, setYearError] = useState(false)
    const [monthError, setMonthError] = useState(false)
    const [dayError, setDayError] = useState(false)
    const [hourError, setHourError] = useState(false)
    const [minuteError, setMinuteError] = useState(false)

    function changeYear(newVal) {
        const valid = newVal > 999 && newVal < 10000? true : false
        setYearError(!valid)
        onChange([parseInt(newVal), value[1], value[2], value[3], value[4]], validity)
    }

    function changeMonth(newVal) {
        const valid = newVal > 0 && newVal < 13? true : false
        setMonthError(!valid)
        onChange([value[0], parseInt(newVal), value[2], value[3], value[4]], validity)
    }

    function changeDay(newVal) {
        const valid = newVal > 0 && newVal < 32? true : false
        setDayError(!valid)
        onChange([value[0], value[1], parseInt(newVal), value[3], value[4]], validity)
    }

    function changeHour(newVal) {
        const valid = newVal > 0 && newVal < 25? true : false
        setHourError(!valid)
        onChange([value[0], value[1], value[2], newVal, value[4]], validity)
    }

    function changeMinute(newVal) {
        const valid = newVal >= 0 && newVal < 61? true : false
        setMinuteError(!valid)
        onChange([value[0], value[1], value[2], value[3], parseInt(newVal)], validity)
    }

    function validity() {
        console.log(yearError=== false && monthError === false && dayError === false && hourError === false && minuteError === false)
        return yearError=== false && monthError === false && dayError === false && hourError === false && minuteError === false
    }


    return (
        <div className="time-input">
            <p>{label}</p>
            <TextField sx={{ width: '20%' }} variant="standard" required label="Year" type="number" error={yearError} {...(yearError ? { helperText: "Year must contain 4 digints." } : {})} value={value[0]} onChange={(e) => changeYear(e.target.value)} />
            <TextField sx={{ width: '10%' }} variant="standard" required label="Month" type="number" error={monthError} {...(monthError ? { helperText: "Month must be from 1 and 12" } : {})} value={value[1]} onChange={(e) => changeMonth(e.target.value)} />
            <TextField sx={{ width: '10%', marginRight: '10%' }} variant="standard" required label="Day" type="number" error={dayError} {...(dayError ? { helperText: "Day must be from 1 to 31" } : {})} value={value[2]} onChange={(e) => changeDay(e.target.value)} />
            <TextField sx={{ width: '10%' }} variant="standard" required label="Hour" type="number" error={hourError} {...(hourError ? { helperText: "Hour must be from 0 to 23" } : {})} value={value[3]} onChange={(e) => changeHour(e.target.value)} />
            <TextField sx={{ width: '10%' }} variant="standard" required label="Minute" type="number" error={minuteError} {...(minuteError ? { helperText: "Minute must be from 0 to 59" } : {})} value={value[4]} onChange={(e) => changeMinute(e.target.value)} />
        </div>
    )
}