import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import styles from "./StockContainer1.module.css";

const AlphaVantageApiKey = 'WEN3PK76IWAH33LW';

const AppleStock = () => {
    const [logoUrl, setLogoUrl] = useState('');
    const [stockData, setStockData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // get company logo
        const fetchLogoUrl = async () => {
            try {
                // get company logo
                const logoUrl = `https://logo.clearbit.com/apple.com`;
                setLogoUrl(logoUrl);
            } catch (err) {
                console.error("Error fetching company logo: ", err);
            }
        };

        // fetch stock data for one day
        const fetchStockData = async () => {
            try {
                const response = await axios.get(
                    `https://www.alphavantage.co/query`,
                    {
                        params: {
                            function: 'TIME_SERIES_INTRADAY',
                            symbol: 'AAPL',
                            interval: '60min',
                            apikey: AlphaVantageApiKey,
                        },
                    }
                );
                console.log(response.data); 
                const timeSeries = response.data['Time Series (60min)'];
                if (timeSeries) {
                    // format and filter data for the most recent day
                    const formattedData = Object.keys(timeSeries)
                        .map((timestamp) => ({
                            time: timestamp,
                            price: parseFloat(timeSeries[timestamp]['4. close']),
                        }))
                        .sort((a, b) => new Date(a.time) - new Date(b.time)); // Sort by time

                    // extract only the data for the most recent day
                    const latestDate = new Date(formattedData[formattedData.length - 1].time).toDateString();
                    const recentDayData = formattedData.filter(data =>
                        new Date(data.time).toDateString() === latestDate
                    );

                    setStockData(recentDayData);
                    setLoading(false);
                } else {
                    setError('Error fetching stock data');
                    setLoading(false);
                }
            } catch (err) {
                setError(err);
                setLoading(false);
            }
        };

        fetchLogoUrl();
        fetchStockData();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data: {error.toString()}</div>;
    // determine line color based on price change
    const isPriceUp = stockData.length > 1
        && stockData[0].price < stockData[stockData.length - 1].price;
    const lineColor = isPriceUp ? '#00C49F' : '#FF0000';

    return (
        <div className={styles.nvidiaStock}>
            <div className={styles.nvidiaInfo}>
                <div className={styles.nvidiaDetails}>
                    <div className={styles.nvidiaHeader}>
                        <img
                            className={styles.nvidia1Icon}
                            loading="lazy"
                            alt="Apple Logo"
                            src={logoUrl}
                        />
                        <a className={styles.appleInc}>Apple Inc</a>
                    </div>
                    <div className={styles.aaplParent}>
                        <a className={styles.aapl}>AAPL</a>
                        <div className={styles.div}>
                        {isPriceUp ? '+' : '-'}{Math.abs(stockData[0].price - stockData[stockData.length - 1].price).toFixed(2)}
                        </div>
                    </div>
                </div>
                <div className={styles.nvidiaValue}>
                    <div className={styles.currentValue}>
                        <div className={styles.currentValue1}>Current Value</div>
                        <a className={styles.value}>${stockData[stockData.length - 1]?.price.toFixed(2)}</a>
                    </div>
                    
                    <ResponsiveContainer width="100%" height={100}>
                        <LineChart data={stockData}>
                            <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                                {/* adjust y range and not show y axis */}
                            <YAxis domain={['dataMin', 'dataMax']} hide={true} />
                            <Line type="monotone" dataKey="price" stroke={lineColor} dot={false} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>  
            </div>
        </div>
    );
};

export default AppleStock;
