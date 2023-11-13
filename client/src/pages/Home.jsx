import { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../components/NavBar';
import SubmissionForm from '../components/SubmissionForm';
import SubmissionList from '../components/SubmissionList';

import '../pages/HomPage.css';


const Home = () => {
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        fetchSubmissions();
    }, []);

    const fetchSubmissions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/submissions', { withCredentials: true });
            setSubmissions(response.data);
        } catch (error) {
            console.error('Error fetching submissions', error);
        }
    };

    return (
        <div>
            <div className="container my-4">
                <NavBar />
            </div>
    
            <div className="container my-4">
                <SubmissionForm fetchSubmissions={fetchSubmissions} />
            </div>

            <div className="container my-4">
                <SubmissionList submissions={submissions} />
            </div>
        </div>
    );
};

export default Home;

