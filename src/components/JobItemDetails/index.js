import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'

import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {HiOutlineExternalLink} from 'react-icons/hi'

import Header from '../Header'
import SimilarJobCard from '../SimilarJobCard'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItemDetails extends Component {
  state = {
    jobDetailsApiConstants: apiStatusConstants.initial,
    jobDetails: {},
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobDetails()
  }

  convertDataIntoCamelCase = data => {
    const jobDetails = data.job_details
    const updatedJobDetails = {
      companyLogoUrl: jobDetails.company_logo_url,
      companyWebsiteUrl: jobDetails.company_website_url,
      employmentType: jobDetails.employment_type,
      id: jobDetails.id,
      jobDescription: jobDetails.job_description,
      lifeAtCompany: {
        description: jobDetails.life_at_company.description,
        imageUrl: jobDetails.life_at_company.image_url,
      },
      location: jobDetails.location,
      packagePerAnnum: jobDetails.package_per_annum,
      rating: jobDetails.rating,
      skills: jobDetails.skills.map(eachSkill => ({
        name: eachSkill.name,
        imageUrl: eachSkill.image_url,
      })),
      title: jobDetails.title,
    }

    const similarJobs = data.similar_jobs.map(eachJob => ({
      companyLogoUrl: eachJob.company_logo_url,
      employmentType: eachJob.employment_type,
      id: eachJob.id,
      jobDescription: eachJob.job_description,
      location: eachJob.location,
      rating: eachJob.rating,
      title: eachJob.title,
    }))

    return {updatedJobDetails, similarJobs}
  }

  getJobDetails = async () => {
    this.setState({jobDetailsApiConstants: apiStatusConstants.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok) {
      const {updatedJobDetails, similarJobs} = this.convertDataIntoCamelCase(
        data,
      )
      this.setState({
        jobDetailsApiConstants: apiStatusConstants.success,
        jobDetails: updatedJobDetails,
        similarJobs,
      })
    } else {
      this.setState({jobDetailsApiConstants: apiStatusConstants.failure})
    }
  }

  renderLoaderView = () => (
    <div className="jobs-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobDetails = () => {
    const {jobDetails, similarJobs} = this.state
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      title,
      companyWebsiteUrl,
      skills,
      lifeAtCompany,
    } = jobDetails
    return (
      <>
        <div className="job-details-page-container">
          <div className="job-details">
            <div className="company-logo-container">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="company-logo-image"
              />
              <div className="company-name-and-rating">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="rating-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="location-and-package-container">
              <div className="location-container">
                <MdLocationOn />
                <p>{location}</p>
              </div>
              <div className="employment-type-container">
                <BsBriefcaseFill />
                <p>{employmentType}</p>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="separator" />
            <div className="description-link-container">
              <h1 className="description">Description</h1>
              <a href={companyWebsiteUrl} className="company-link">
                Visit
                <HiOutlineExternalLink />
              </a>
            </div>
            <p className="job-description">{jobDescription}</p>
            <h1 className="skills-heading">Skills</h1>
            <ul className="skills-list">
              {skills.map(eachSkill => {
                const {imageUrl, name} = eachSkill
                return (
                  <li className="skill-item" key={name}>
                    <img src={imageUrl} alt={name} className="skill-image" />
                    <p className="skill-name">{name}</p>
                  </li>
                )
              })}
            </ul>
            <h1 className="life-at-company-heading">Life at Company</h1>
            <div className="life-at-company-container">
              <p className="life-at-company-description">
                {lifeAtCompany.description}
              </p>
              <img
                src={lifeAtCompany.imageUrl}
                alt="life at company"
                className="life-at-company-image"
              />
            </div>
          </div>
          <h1 className="similar-jobs-heading">Similar Jobs</h1>
          <div className="similar-jobs-container">
            <ul className="similar-jobs-list">
              {similarJobs.map(eachJob => (
                <SimilarJobCard jobDetails={eachJob} key={eachJob.id} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  renderJobsApiFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="no-jobs-image"
      />
      <h1 className="no-jobs-found">Oops! Something Went Wrong</h1>
      <p className="no-jobs-text">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-button"
        onClick={() => this.getJobDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderJobDetailsPage = () => {
    const {jobDetailsApiConstants} = this.state
    switch (jobDetailsApiConstants) {
      case apiStatusConstants.inProgress:
        return this.renderLoaderView()
      case apiStatusConstants.success:
        return this.renderJobDetails()
      case apiStatusConstants.failure:
        return this.renderJobsApiFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-details-page">
        <Header />
        {this.renderJobDetailsPage()}
      </div>
    )
  }
}
export default JobItemDetails
