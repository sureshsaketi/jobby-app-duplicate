import {Link} from 'react-router-dom'
import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './index.css'

const SimilarJobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="similar-job-card">
      <Link to={`/jobs/${id}`} className="job-card-link">
        <div className="company-logo-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
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
        <h1 className="description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
        <div className="location-and-package-container">
          <div className="location-container">
            <MdLocationOn />
            <p>{location}</p>
          </div>
          <div className="employment-type-container">
            <BsBriefcaseFill />
            <p>{employmentType}</p>
          </div>
          <h1 className="package">{packagePerAnnum}</h1>
        </div>
      </Link>
    </li>
  )
}
export default SimilarJobCard
