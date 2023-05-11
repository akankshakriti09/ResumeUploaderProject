import { Grid, TextField, Typography, FormControlLabel, Checkbox, Button, Box, Alert, InputLabel, MenuItem, Select, FormControl, FormLabel,
RadioGroup, Radio, FormGroup, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Avatar } 
from '@mui/material';
import { LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {  useSaveProfileMutation} from './services/ProfileApi';

function App() {

  // Style for Upload Button
  const Input = styled('input')({
      display: 'none',
   });

  // States
  const [name, setName] = useState() //Name
  const [email, setEmail] = useState() //EMail
  const [dob, setDob] = useState(null) //Date of Birth
  const [st, setSt] = useState('') //State
  const [gender, setGender] = useState() //Gender
  const [pjl, setPjl] = useState([]) //Job Location
  const [pimage, setPimage] = useState('') //Upload Image
  const [rdoc, setRdoc] = useState('') //Upload Resume Doc
  const [error, setError] = useState({
    status: false,
    msg: "",
    type: ""
  })

  // Multi Checkbox for Preferred Job Location
  const getPjl = (e) => {
      let data = pjl
      data.push(e.target.value)
      setPjl(data)
  }

  // Clear Form
  const resetForm = () => {
      setName('')
      setEmail('')
      setDob(null)
      setSt('')
      setGender('')
      setPjl([])
      setPimage('')
      setRdoc('')
      document.getElementById('resume-form').reset()
   }

   // RTK query
   const [saveProfile] = useSaveProfileMutation()

   // Handle Form Submission
   const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData()
    data.append('name', name)
    data.append('email', email)
    data.append('dob', dob)
    data.append('st', st)
    data.append('gender', gender)
    data.append('pjl', pjl)
    data.append('pimage', pimage)
    data.append('rdoc', rdoc)
    if (name && email) {
      const res = await saveProfile(data)
      console.log(res)
      setError({ status: true, msg: "Resume Uploaded Successfully", type: 'success' })
      resetForm()
    } else {
      setError({ status: true, msg: "All Fields are Required", type: 'error' })
    }
  }

  return (
    <>
      <Box display="flex" justifyContent="center" sx={{
       backgroundColor:"#B71C1C" , padding:2}}>
        <Typography variant="h4" component="div" sx={{ 
          fontWeight:"bold", color:"white"}}>Resume Uploader</Typography>
      </Box>
      <Grid container justifyContent="center">

        <Grid item xs={5}>
          <Box component="form" sx={{ p: 3 }} noValidate id="resume-form" onSubmit={handleSubmit}>
            <TextField id="name" name="name" required fullWidth margin='normal' label='Name' onChange={(e) => setName(e.target.value)} />
            <TextField id="email" email="email" required fullWidth margin='normal' label='Email' onChange={(e) => setEmail(e.target.value)} />
            <Box mt={2}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker 
                label="Date of Birth"
                value={dob} 
                onChange={(newValue) => setDob(newValue)} 
                textField={(props) => <TextField {...props} />}
                />
              </LocalizationProvider>
            </Box>
            <FormControl fullWidth margin='normal'>
              <InputLabel id="state-select-label">State</InputLabel>
              <Select labelid='state-select-label' id='state-select' value={st} label='st' onChange={(e)=>{setSt(e.target.value)}}>
                <MenuItem value="AP">Andhra Pradesh</MenuItem>
                <MenuItem value="ARP">Arunachal Pradesh</MenuItem>
                <MenuItem value="ASM">Assam</MenuItem>
                <MenuItem value="BH">Bihar</MenuItem>
                <MenuItem value="CH">Chhattisgarh</MenuItem>
                <MenuItem value="G">Goa</MenuItem>
                <MenuItem value="GJ">Gujarat</MenuItem>
                <MenuItem value="JH">Jharkhand</MenuItem>
                <MenuItem value="KA">Karnataka</MenuItem>
                <MenuItem value="KL">Kerala</MenuItem>
                <MenuItem value="MP">Madhya Pradesh</MenuItem>
                <MenuItem value="MH">Maharashtra</MenuItem>
                <MenuItem value="MR">Manipur</MenuItem>
                <MenuItem value="MGH">Meghalaya</MenuItem>
                <MenuItem value="MZ">Mizoram</MenuItem>
                <MenuItem value="N">Nagaland</MenuItem>
                <MenuItem value="O">Odisha</MenuItem>
                <MenuItem value="P">Punjab</MenuItem>
                <MenuItem value="RJ">Rajasthan</MenuItem>
                <MenuItem value="S"> Sikkim</MenuItem>
                <MenuItem value="TN">Tamil Nadu</MenuItem>
                <MenuItem value="TL">Telangana</MenuItem>
                <MenuItem value="TR">Tripura</MenuItem>
                <MenuItem value="UK">Uttarakhand</MenuItem>
                <MenuItem value="UP">Uttar Pradesh</MenuItem>
                <MenuItem value="WB">West Bengal</MenuItem>
              </Select>
            </FormControl>
          
            <FormControl fullWidth margin='normal'>
              <FormLabel id="gender-radio">Gender</FormLabel>
              <RadioGroup row name="gender" aria-labelledby="gender-radio">
                <FormControlLabel value="male" control={<Radio />} label='Male' onChange={(e) => setGender(e.target.value)} />
                <FormControlLabel value="female" control={<Radio />} label='Female' onChange={(e) => setGender(e.target.value)} />
                <FormControlLabel value="other" control={<Radio />} label='Other' onChange={(e) => setGender(e.target.value)} />
              </RadioGroup>
            </FormControl>

            <FormControl component='fieldset' fullWidth margin='normal'>
              <FormLabel component='legend'>Preferred Job Location:</FormLabel>
              <FormGroup row>
               <FormControlLabel control={<Checkbox />} label="Bangalore" value="Bangalore" onChange={(e) => getPjl(e)} />
               <FormControlLabel control={<Checkbox />} label="Hyedarabad" value="Hyedarabad" onChange={(e) => getPjl(e)} />
               <FormControlLabel control={<Checkbox />} label="Mumbai" value="Mumbai" onChange={(e) => getPjl(e)} />
               <FormControlLabel control={<Checkbox />} label="Delhi" value="Delhi" onChange={(e) => getPjl(e)} />
               <FormControlLabel control={<Checkbox />} label="Kolkata" value="Kolkata" onChange={(e) => getPjl(e)} /> 
              </FormGroup>
            </FormControl>

            <Stack direction="row" alignItems="center" spacing={4} >
              <label htmlFor='profile-photo'>
                <Input accept="image/*" id="profile-photo" type="file" onChange={(e) => { setPimage(e.target.files[0]) }} />
                <Button variant='contained' component='span'>Upload Photo </Button>
              </label>
              <label htmlFor="resume-file">
                <Input accept="doc/*" id="resume-file" type="file" onChange={(e) => { setRdoc(e.target.files[0]) }} />
                <Button variant="contained" component="span">Upload File</Button>
              </label>
            </Stack>

            <Button type='submit' variant='contained' sx={{ mt: 3, mb: 2, px: 5 }} color="error">Submit</Button>
            {error.status ? <Alert severity={error.type}>{error.msg}</Alert> : ''}
          </Box>
        </Grid>

        <Grid item xs={7}>
          <Box display="flex" justifyContent="center" sx={{ backgroundColor: 'info.light', padding: 1 }}>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', color: 'white' }}> List of Candidates</Typography>
          </Box>

          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Name</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">State</TableCell>
                  <TableCell align="center">Gender</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Profile</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell align="center">Prity</TableCell>
                  <TableCell align="center">prity@gmail.com</TableCell>
                  <TableCell align="center">12/08/1998</TableCell>
                  <TableCell align="center">Bihar</TableCell>
                  <TableCell align="center">Female</TableCell>
                  <TableCell align="center">Delhi Ranchi</TableCell>
                  <TableCell align="center"><Avatar src="#" /></TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

        </Grid>
      </Grid>
    </>
  );
}

export default App;
