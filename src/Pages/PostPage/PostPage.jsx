import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import './PostPage.css';

export default function PostPage() {
    const { id } = useParams();
    const nav = useNavigate();

    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [newPost, setNewPost] = useState("");



    if (!id) {
        return (
            <div className="homepageNoId">
                <h1>Welcome to Accomplishment Tracker</h1>
                <button onClick={() => nav("/signingin")}>Sign In</button>
            </div>
        );
    }


    useEffect(() => {
        const getPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/user/${id}/posts`);
                setUser(response.data.user);
                setPosts(response.data.posts);
            } catch (error) {
                console.error(error.message);
            }
        };
        getPosts();
    }, [id]);


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3000/api/user/${id}/posts`, {
                post: newPost
            });

            setPosts(prev => [response.data, ...prev]); // add new post to top
            setNewPost("");
        } catch (error) {
            console.error(error.message);
        }
    };

    const handleDelete = async (postId) => {
        try {
            await axios.delete(`http://localhost:3000/api/post/${postId}`);
            setPosts(prev => prev.filter(p => p._id !== postId));
        } catch (error) {
            console.error(error.message);
            alert("Failed to delete post!");
        }
    };

    return (
        <div className="postContainer">

            <div className="createPostContainer">
                <h2>{`${user.username}'s Newest Post`}</h2>
                <form onSubmit={handleSubmit} className="postForm">
                    <textarea
                        value={newPost}
                        onChange={(e) => setNewPost(e.target.value)}
                        placeholder="What do you plan to accomplish next?"
                        required
                    />
                    <button type="submit">POST</button>
                </form>
            </div>


            <div>
                <h1>{`${user.firstName} ${user.lastName}'s Posts`}</h1>
                <div className="postList">
                    {posts.map((p) => (
                        <div key={p._id} className="postCard">
                            <span>{new Date(p.createdAt).toLocaleString()}</span>
                            <p>{p.post}</p>
                            <button className="deleteButton" onClick={() => handleDelete(p._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
}