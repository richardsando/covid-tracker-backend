const express = require('express')
const app = express()
const cors = require('cors')
const axios = require('axios')
const dotenv = require('dotenv')
dotenv.config();


const port = process.env.PORT || 5000;
app.use(express.json())
app.use(cors())

const key = process.env.APIKEY


app.get(`/api/:country`, async (req, res) => {
  try {
    console.log(req.params)
    // const params = "italy"
    const {
      country
    } = req.params
    console.log(country)
    const response = await axios.get(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${country}`, {
      headers: {
        "x-rapidapi-key": key
      }
    })
    // const response = await axios.get(`https://covid-19-data.p.rapidapi.com/country?name=${country}`, {
    //   headers: {
    //     "x-rapidapi-key": key
    //   }
    // })
    console.log(response.data)
    res.send(response.data)
  } catch (error) {
    console.log(error)
    res.status(500).send(error)
  }
})

app.listen(port, () => console.log(`Express listening on port ${port}!`))