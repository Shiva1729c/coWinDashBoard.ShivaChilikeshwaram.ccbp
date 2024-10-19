// Write your code here
import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

const VaccinationCoverage = props => {
  const {Last7DaysVaccinationData} = props

  const DataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}k`
    }
    return number.toString()
  }

  return (
    <div>
      {/*  BarChart : This component is the container for the bar chart. */}
      <BarChart
        width={900}
        height={500}
        data={Last7DaysVaccinationData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: '#6c757d',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
            fontSize: 20,
          }}
        />

        <Bar
          dataKey="dose1"
          name="Dose 1"
          fill="#5a8dee"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          fill="#f54394"
          radius={[5, 5, 0, 0]}
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
