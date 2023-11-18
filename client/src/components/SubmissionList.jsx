import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const colorClasses = ['pastel-red', 'pastel-orange', 'pastel-yellow', 'pastel-green', 'pastel-blue', 'pastel-indigo', 'pastel-violet'];

const SubmissionList = ({ submissions }) => {
    return (
        <div>
            <h2>All Submissions</h2>
            <div className="submission-list-container"> 
                {submissions.map((submission, index) => (
                    <div className={`submission-card ${colorClasses[index % colorClasses.length]}`} key={submission._id}> 
                        <h3>
                            <Link to={`/details/${submission._id}`}>
                                {submission.name}
                            </Link>
                        </h3>
                        <p>{submission.city}, {submission.state}</p>
                        <p>Submitted by: {submission.user.firstName}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

// Define propTypes for SubmissionList
SubmissionList.propTypes = {
    submissions: PropTypes.arrayOf(PropTypes.shape({
        _id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        city: PropTypes.string.isRequired,
        state: PropTypes.string.isRequired,
        user: PropTypes.shape({
            firstName: PropTypes.string.isRequired
        }).isRequired
    })).isRequired
};

export default SubmissionList;
