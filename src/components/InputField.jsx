import { TextField } from "@mui/material"

export default function InputField({ type, label, error, errorText, value, onChange }) {
  return (
    <div>
      <TextField sx={{ width: '70%' }}variant="standard" required label={label} type={type} error={error} {...(error ? { helperText: errorText } : {})} value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  )
}