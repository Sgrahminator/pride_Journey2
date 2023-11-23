import { useState, useEffect } from 'react';
import axios from 'axios';

const QnA = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        fetchQuestions();
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await axios.get('http://localhost:8000/qna');
            setQuestions(response.data);
        } catch (error) {
            console.error('Error fetching questions', error);
        }
    };

    return (
        <div>
            <h2>Questions & Answers</h2>
            {questions.map((question) => (
                <div key={question._id}>
                    <h3>{question.title}</h3>
                    <p>{question.question}</p>
                    <div>
                        {question.answers && question.answers.map((answer) => (
                            <div key={answer._id}>
                                <p>{answer.content}</p>
                                <p>Answered by: {answer.author ? `${answer.author.firstName} ${answer.author.lastName}` : 'Anonymous'}</p>
                                {/* I can add more answer details here as needed */}
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default QnA;
