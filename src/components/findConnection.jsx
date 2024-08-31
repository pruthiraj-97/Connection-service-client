import React, { useState } from "react";
import '../CSS/findConnection.css';
import { useNavigate } from "react-router-dom";
function FindConnection() {
    const [user1, setUser1] = useState("");
    const [user2, setUser2] = useState("");
    const [connections, setConnections] = useState([]);
    const [error, setError] = useState(null);
    const [isPathExist,setIsPathExist]=useState(true)
    const navigator=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(user1, user2);
            const response = await fetch(`http://localhost:3005/api/v1/connection/connect?source=${user1}&destination=${user2}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': localStorage.getItem('token'),
                },
            });

            const data = await response.json();
            console.log(data)
            if(data.status==200){
                setConnections(data.data)
                setError(null)
                if(data.data.length==0){
                    setIsPathExist(false)
                }else{
                    setIsPathExist(true)
                }
            }else if(data.status==400){
                setError(data.error.message)
                setConnections([])
                setIsPathExist(true)
            }else if(data.status==401){
               navigator('/login')
            }
    };
    return (
        <div className="find-connection">
            <h2>Find Connection Between Users</h2>
            {
                error && <p className="error">{error}</p>
            }
            {
                !isPathExist && <p className="path-error">No path found</p>
            }
            <form onSubmit={handleSubmit}>
                <div className="input-group">
                    <label>Enter source:</label>
                    <input
                        type="text"
                        value={user1}
                        onChange={(e) => setUser1(e.target.value)}
                        placeholder="source"
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Enter destination:</label>
                    <input
                        type="text"
                        value={user2}
                        onChange={(e) => setUser2(e.target.value)}
                        placeholder="destination"
                        required
                    />
                </div>
                <button type="submit">Find Connection</button>
            </form>
            {connections.length > 0 && (
                <div className="connection-results">
                    <ul>
                        {connections.map((connection, index) => (
                            <li key={index}>
                                {connection.map((user, idx) => (
                                    <span key={user._id}>
                                        {user.name}
                                        {idx < connection.length - 1 && " -> "}
                                    </span>
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default FindConnection;
