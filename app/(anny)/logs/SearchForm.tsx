import FormValues from "@/interface/logs/FormValues";
import { TextField } from "@mui/material";
import { LocalizationProvider, MobileDateTimePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";

export default function SearchForm({ formValues, setFormValues }: { formValues: FormValues, setFormValues: React.Dispatch<React.SetStateAction<FormValues>> }) {
  return (
    <>
      <TextField name="username" label="Username" defaultValue={formValues.username} type="search"
        onKeyPress={handleInputEvent}
        onBlur={(e) => { if (e.target.value != formValues.username) setFormValues({ ...formValues, username: e.target.value, page: 1 }) }}
      />
      <TextField name="search" label="Search" defaultValue={formValues.search} type="search"
        onKeyPress={handleInputEvent}
        onBlur={(e) => { if (e.target.value != formValues.search) setFormValues({ ...formValues, search: e.target.value, page: 1 }) }}
      />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <MobileDateTimePicker
          label="Before"
          value={formValues.endDate}
          onAccept={(date) => { if (date != formValues.endDate) setFormValues({ ...formValues, endDate: date, page: 1 }) }}
        />
        <MobileDateTimePicker
          label="After"
          value={formValues.startDate}
          onAccept={(date) => { if (date != formValues.startDate) setFormValues({ ...formValues, startDate: date, page: 1 }) }}
        />
      </LocalizationProvider>
    </>
  )
}

const handleInputEvent = (e: any) => {
  // if key is enter, deselect the input box
  if (e.key === "Enter") {
    e.target.blur();
  }
};
