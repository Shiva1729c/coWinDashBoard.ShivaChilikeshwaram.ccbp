// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {
    Last7DaysVaccinationData: [],
    vaccinationByGender: [],
    vaccinationByAge: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getVaccinationData()
  }

  getVaccinationData = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const response = await fetch('https://apis.ccbp.in/covid-vaccination-data')
    const data = await response.json()

    if (response.ok === true) {
      const formattedLast7DaysVaccination = data.last_7_days_vaccination.map(
        eachVaccine => ({
          dose1: eachVaccine.dose_1,
          dose2: eachVaccine.dose_2,
          vaccineDate: eachVaccine.vaccine_date,
        }),
      )

      const formattedVaccinationByGender = data.vaccination_by_gender.map(
        eachGender => ({
          count: eachGender.count,
          gender: eachGender.gender,
        }),
      )

      const formattedvaccinationByAge = data.vaccination_by_age.map(
        eachAge => ({
          count: eachAge.count,
          age: eachAge.age,
        }),
      )

      this.setState({
        Last7DaysVaccinationData: formattedLast7DaysVaccination,
        vaccinationByGender: formattedVaccinationByGender,
        vaccinationByAge: formattedvaccinationByAge,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderVaccinationCoverage = () => {
    const {Last7DaysVaccinationData} = this.state
    return (
      <div className="vaccination-container">
        <h1 className="vaccine-heading">Vaccination Coverage</h1>
        <VaccinationCoverage
          Last7DaysVaccinationData={Last7DaysVaccinationData}
        />
      </div>
    )
  }

  renderVaccinationByGender = () => {
    const {vaccinationByGender} = this.state
    return (
      <div className="vaccination-container">
        <h1 className="vaccine-heading">Vaccination by gender</h1>
        <VaccinationByGender vaccinationByGender={vaccinationByGender} />
      </div>
    )
  }

  renderVaccinationByAge = () => {
    const {vaccinationByAge} = this.state
    return (
      <div className="vaccination-container">
        <h1 className="vaccine-heading">Vaccination by age</h1>
        <VaccinationByAge vaccinationByAge={vaccinationByAge} />
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-message">Something Went Wrong</h1>
    </div>
  )

  renderSuccessView = () => (
    <>
      {this.renderVaccinationCoverage()}
      {this.renderVaccinationByGender()}
      {this.renderVaccinationByAge()}
    </>
  )

  renderApiStatus = () => {
    const {apiStatus} = this.state
    console.log('API Status:', apiStatus) // Debugging log

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-container">
        <div className="cowin-dashboard-content">
          <div className="header">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="heading">Co-WIN</h1>
          </div>
          <h1 className="stats-title">CoWIN Vaccination in India</h1>
          {this.renderApiStatus()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
