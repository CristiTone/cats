import {useRef, useState} from 'react'
import {Button, Grid, IconButton, List, ListItem, Tab, TextField} from "@mui/material";
import {TabContext, TabList, TabPanel} from "@mui/lab";
import {LineChart} from "@mui/x-charts";
import {Delete} from "@mui/icons-material";

function App() {
  const [value, setValue] = useState('weight');
  const [entry, setEntry] = useState({
      0: {
            date: '01/02/2023',
            weight: '3.2',
            creatinine: '3.4'
        },
        1: {
            date: '01/31/2023',
            weight: '2.5',
            creatinine: '3.9'
        },

        2: {
            date: '02/06/2023',
            weight: '2.5',
            creatinine: '3.7'
        },
        3: {
            date: '02/15/2023',
            weight: '2.5',
            creatinine: '3.5'
        },
        4: {
            date: '02/25/2023',
            weight: '2.8',
            creatinine: '3.4'
        },
        5: {
            date: '05/06/2023',
            weight: '2.7',
            creatinine: '4.5'
        },
        6: {
            date: '09/24/2023',
            weight: '1.7',
            creatinine: '5.4'
        }
  });
  const [date, setDate] = useState([
      '01/02/2023',
      '01/31/2023',
      '02/06/2023',
      '02/15/2023',
      '02/25/2023',
      '05/06/2023',
      '09/24/2023',
  ]);
  const [weight, setWeight] = useState([
      '3.2',
      '2.5',
      '2.5',
      '2.5',
      '2.8',
      '2.7',
      '1.7'
  ]);
  const [creatinine, setCreatinine] = useState([
      '3.4',
      '3.9',
      '3.7',
      '3.5',
      '3.4',
      '4.5',
      '5.4'
  ]);

  return (
      <TabContext value={value}>
          <TabList onChange={(e, newValue) => setValue(newValue)} aria-label="lab API tabs example">
            <Tab label="Greutate" value="weight" />
            <Tab label="Creatinina" value="creatinine" />
        </TabList>
          <TabPanel value="weight"><Layout date={date} info={weight} setDate={setDate} setInfo={setWeight}></Layout></TabPanel>
          <TabPanel value="creatinine"><Layout date={date} info={creatinine} setDate={setDate} setInfo={setCreatinine}></Layout></TabPanel>
      </TabContext>
  )
}


// eslint-disable-next-line react/prop-types
function Data({ date, info, setInfo, setDate}) {
    const [actualDate, setActualDate] = useState('')
    const [actualInfo, setActualInfo] = useState('')
    function handleDelete(_e, index) {
       const newInfo = info.filter((_, i) => i !== index)
       const newDate = date.filter((_, i) => i !== index)

      setDate(newDate)
      setInfo(newInfo)
    }

    function handleSubmit() {
        setDate([...date, actualDate])
        setInfo([...info, actualInfo])
    }
    return (
        <>
        <Grid container alignItems="center">
            <Grid>
                <TextField label="Date" variant="outlined" value={actualDate} onChange={(e) => setActualDate(e.target.value)} />
            </Grid>
            <Grid>
              <TextField label="Info" variant="outlined" value={actualInfo} onChange={(e) => setActualInfo(e.target.value)} />
            </Grid>
            <Grid>
                <Button onClick={handleSubmit}>Submit</Button>
            </Grid>
        </Grid>
        <List>
            {
                // eslint-disable-next-line react/prop-types
                date.map((d, i) => (
                    <ListItem key={i}
                          secondaryAction={
                              <IconButton aria-label="comment" onClick={(e) => handleDelete(e, i)}>
                                  <Delete />
                              </IconButton>
                          }
                    >
                        {d} - {info[i]}
                    </ListItem>
                ))
            }
        </List>
        </>
    )
}

// eslint-disable-next-line react/prop-types
function Chart({date, info}) {
    // eslint-disable-next-line react/prop-types
    const parsedDate = date.map((d) => new Date(d))
    return (
        <LineChart
            xAxis={[{ data: parsedDate, scaleType: 'time'}]}
            series={[
                {
                    data: info,
                },
            ]}
            width={1000}
            height={600}
        />
    )
}

// eslint-disable-next-line react/prop-types
function Layout({date, info, setInfo, setDate }) {
    return (
      <Grid container spacing={2} justifyContent="center">
        <Grid flex={4} ><Data date={date} info={info} setInfo={setInfo} setDate={setDate} /></Grid>
        <Grid flex={8}><Chart date={date} info={info} /></Grid>
      </Grid>
  )
}

export default App
