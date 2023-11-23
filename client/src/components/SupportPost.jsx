import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types'; 

const SupportPost = ({ currentUser }) => {
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState({
        title: '',
        content: '',
        postType: 'text',
        image: null
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/supportpost');
            setPosts(response.data);
        } catch (error) {
            console.error('Error fetching posts', error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewPost({ ...newPost, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewPost({ ...newPost, image: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', newPost.title);
        formData.append('content', newPost.content);
        formData.append('postType', newPost.postType);
        formData.append('author', currentUser._id); // Attach current user's ID

        if (newPost.image) {
            formData.append('image', newPost.image);
        }

        try {
            await axios.post('http://localhost:8000/supportpost', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            setNewPost({ title: '', content: '', postType: 'text', image: null });
            fetchPosts(); // Refresh posts
        } catch (error) {
            console.error('Error submitting post', error);
        }
    };

    const renderPostContent = (post) => {
        switch (post.postType) {
            case 'text':
                return <p>{post.content}</p>;
            case 'image':
                return <img src={post.content} alt={post.title} style={{ maxWidth: '100%' }} />;
            case 'combo':
                return (
                    <>
                        <p>{post.content}</p>
                        <img src={post.content} alt={post.title} style={{ maxWidth: '100%' }} />
                    </>
                );
        }
    };

    return (
        <div>
            <h2>Create a Support Post</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={newPost.title} onChange={handleInputChange} placeholder="Title" required />
                <textarea name="content" value={newPost.content} onChange={handleInputChange} placeholder="Content" required />
                <select name="postType" value={newPost.postType} onChange={handleInputChange}>
                    <option value="text">Text</option>
                    <option value="image">Image</option>
                    <option value="combo">Combo</option>
                </select>
                {newPost.postType !== 'text' && (
                    <input type="file" name="image" onChange={handleFileChange} accept="image/*" />
                )}
                <button type="submit">Submit Post</button>
            </form>
            <h2>Support Posts</h2>
            {posts.map((post) => (
                <div key={post._id}>
                    <h3>{post.title}</h3>
                    {renderPostContent(post)}
                </div>
            ))}
        </div>
    );
};

// Define PropTypes for the component
SupportPost.propTypes = {
    currentUser: PropTypes.shape({
        _id: PropTypes.string.isRequired
    }).isRequired
};

export default SupportPost;

