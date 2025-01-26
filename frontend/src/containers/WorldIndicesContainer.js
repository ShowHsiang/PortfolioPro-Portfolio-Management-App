import React, { useEffect, useState } from "react";
import axios from "axios";

const base_url = process.env.REACT_APP_API_URL;
const WorldIndicesContainer = () => {
    const [worldIndices, setWorldIndices] = useState([]);
    const [lastUpdated, setLastUpdated] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchWorldIndices = async () => {
        try {
            const res = await axios.get(`${base_url}/market/world-indices/`);
            setWorldIndices(res.data);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching world indices:", error);
        }
    };

    const checkAndUpdateWorldIndices = async () => {
        try {
            const res = await axios.get(`${base_url}/market/check-update/`);
            setLastUpdated(res.data.last_updated);
            if (res.data.status === "updated") {
                console.log("Data updated. Fetching latest world indices...");
                fetchWorldIndices(); // Fetch new data if updated
            } else {
                console.log("Data is up-to-date.");
                fetchWorldIndices();
            }
        } catch (error) {
            console.error("Error checking and updating world indices:", error);
        }
    };

    useEffect(() => {
        checkAndUpdateWorldIndices();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>World Indices</h2>
            <p>Last Updated: {new Date(lastUpdated).toLocaleString()}</p>
            <table>
                <thead>
                    <tr>
                        <th>Region</th>
                        <th>Symbol</th>
                        <th>Price</th>
                        <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(worldIndices).map(([region, indices]) => (
                        indices.map((index, idx) => (
                            <tr key={`${region}-${idx}`}>
                                <td>{region}</td>
                                <td>{index.symbol}</td>
                                <td>{index.price}</td>
                                <td>{index.change}</td>
                            </tr>
                        ))
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default WorldIndicesContainer;
