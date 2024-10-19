// Write your code here
import './index.css'

import {PieChart, Pie, Legend, Cell} from 'recharts'

const VaccinationByGender = props => {
  const {vaccinationByGender} = props
  return (
    <div className="pie">
      <PieChart width={500} height={300} className="pie-chart">
        <Pie
          cx="50%"
          cy="40%"
          data={vaccinationByGender}
          startAngle={180}
          endAngle={0}
          innerRadius="40%"
          outerRadius="70%"
          dataKey="count"
        >
          <Cell name="Male" fill=" #f54394" />
          <Cell name="Female" fill="#5a8dee" />
          <Cell name="Others" fill="#2cc6c6" />
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

export default VaccinationByGender
