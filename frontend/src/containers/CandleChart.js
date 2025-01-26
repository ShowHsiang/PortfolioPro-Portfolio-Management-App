import React, { useEffect, useState } from 'react';
import ApexCharts from 'react-apexcharts';
import { Select, MenuItem, Button, FormControl, InputLabel } from '@mui/material';
import axios from 'axios';

const CandleChart = () => {
    const [data, setData] = useState([]);
    const [selectedAsset, setSelectedAsset] = useState('');
    const [watchlist, setWatchlist] = useState([]);
    const [timeRange, setTimeRange] = useState('1M');

    const fetchWatchlist = async () => {
        const token = localStorage.getItem('accessToken');
        const baseURL = process.env.REACT_APP_API_URL;

        try {
            const response = await axios.get(`${baseURL}/market/watchlist/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setWatchlist(response.data.map((item) => item.symbol));
        } catch (error) {
            console.error('Error fetching watchlist:', error.response?.data || error.message);
        }
    };

    const fetchPriceHistory = async () => {
        if (!selectedAsset) {
            console.warn('No asset selected.');
            return;
        }

        const token = localStorage.getItem('accessToken');
        const baseURL = process.env.REACT_APP_API_URL;

        const params = {
            start_date: getStartDate(timeRange),
            end_date: getEndDate(),
        };

        try {
            const response = await axios.get(`${baseURL}/market/stock/${selectedAsset}/?history=true`, {
                params,
                headers: { Authorization: `Bearer ${token}` },
            });
            const priceData = response.data.map((item) => ({
                x: new Date(item.date).getTime(),
                y: [
                    parseFloat(item.open_price),
                    parseFloat(item.high_price),
                    parseFloat(item.low_price),
                    parseFloat(item.close_price),
                    parseFloat(item.volume),
                ],
            }));
            setData(priceData);
        } catch (error) {
            console.error('Error fetching price history:', error.response?.data || error.message);
        }
    };

    const getStartDate = (range) => {
        const today = new Date();
        switch (range) {
            case '1W':
                return new Date(today.setDate(today.getDate() - 7)).toISOString().split('T')[0];
            case '1M':
                return new Date(today.setMonth(today.getMonth() - 1)).toISOString().split('T')[0];
            case '1Y':
                return new Date(today.setFullYear(today.getFullYear() - 1)).toISOString().split('T')[0];
            default:
                return '';
        }
    };

    const getEndDate = () => {
        return new Date().toISOString().split('T')[0];
    };

    useEffect(() => {
        fetchWatchlist();
    }, []);

    useEffect(() => {
        if (selectedAsset) {
            fetchPriceHistory();
        }
    }, [selectedAsset, timeRange]);

    const chartOptions = {
        chart: {
            type: 'candlestick',
            height: 350,
        },
        title: {
            text: `Price History of ${selectedAsset}`,
            align: 'center',
        },
        xaxis: {
            type: 'datetime',
        },
        yaxis: {
            tooltip: {
                enabled: true,
            },
        },
        tooltip: {
            x: {
                format: 'yyyy-MM-dd',
            },
        },
    };

    return (
        <div>
            <h2>Candlestick Chart</h2>
            <FormControl style={{ marginRight: '1rem', minWidth: 120 }}>
                <InputLabel>Time Range</InputLabel>
                <Select value={timeRange} onChange={(e) => setTimeRange(e.target.value)}>
                    <MenuItem value="1W">Last Week</MenuItem>
                    <MenuItem value="1M">Last Month</MenuItem>
                    <MenuItem value="1Y">Last Year</MenuItem>
                </Select>
            </FormControl>
            <FormControl style={{ marginRight: '1rem', minWidth: 120 }}>
                <InputLabel>Asset</InputLabel>
                <Select
                    value={selectedAsset}
                    onChange={(e) => setSelectedAsset(e.target.value)}
                >
                    <MenuItem value="">Select Asset</MenuItem>
                    {watchlist.map((symbol) => (
                        <MenuItem key={symbol} value={symbol}>
                            {symbol}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button variant="contained" onClick={fetchPriceHistory}>
                Refresh
            </Button>

            {data.length > 0 ? (
                <ApexCharts
                    options={chartOptions}
                    series={[{ data }]}
                    type="candlestick"
                    height={500}
                    width={1200}
                />
            ) : (
                <p>No data available. Select an asset to view its candlestick chart.</p>
            )}
        </div>
    );
};

export default CandleChart;
