// Write your code here
import './index.css'

import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByAge = props => {
  const {vaccinationByAge} = props
  return (
    <div className="pie">
      <PieChart width={500} height={300} className="pie-chart">
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationByAge}
          startAngle={0}
          endAngle={360}
          innerRadius="0"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="18-44" fill="  #2d87bb" />
          <Cell name="44-60" fill="#a3df9f" />
          <Cell name="Above 60" fill="#64c2a6" />
        </Pie>
        <Legend
          iconType="circle"
          layout="horizontal"
          verticalAlign="bottom"
          align="center"
        />
      </PieChart>
    </div>
  )
}

export default VaccinationByAge
