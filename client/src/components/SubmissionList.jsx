import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'; 

const SubmissionList = ({ submissions }) => {
    return (
        <div>
            <h2>All Submissions</h2>
            <ul>
                {submissions.map(submission => (
                    <li key={submission._id}>
                        <Link to={`/details/${submission._id}`}>
                            {submission.name}
                        </Link> - {submission.city}, {submission.state}, submitted by: {submission.user.firstName}
                    </li>
                ))}
            </ul>
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
