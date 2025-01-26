import React, { useState, useEffect, useRef } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import '../styles/QuickOverview_PP.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const QuickOverview = () => {
    const [balance, setBalance] = useState(0);
    const [invested, setInvested] = useState(0);
    const [investmentDistribution, setInvestmentDistribution] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchQuickOverviewData = async () => {
            const token = localStorage.getItem('accessToken');
            const baseURL = process.env.REACT_APP_API_URL;

            try {
                const portfolioResponse = await axios.get(`${baseURL}/portfolios/`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const portfolio = portfolioResponse.data[0];
                const holdings = portfolio.holdings || [];

                let totalBalance = 0;
                let totalInvested = 0;
                const distribution = {};

                const symbols = holdings.map((holding) => holding.symbol);
                const assetsResponse = await axios.get(`${baseURL}/market/assets/`, {
                    params: { symbols: symbols.join(',') },
                    headers: { Authorization: `Bearer ${token}` },
                });
                const assets = assetsResponse.data;

                const symbolToMarketType = {};
                assets.forEach((asset) => {
                    symbolToMarketType[asset.symbol] = asset.market_type || 'Others';
                });

                holdings.forEach((holding) => {
                    const marketType = symbolToMarketType[holding.symbol] || 'Others';
                    totalBalance += Number(holding.market_value);
                    totalInvested += holding.shares * holding.cost_basis;
                    distribution[marketType] = (distribution[marketType] || 0) + Number(holding.market_value);
                });

                setBalance(totalBalance);
                setInvested(totalInvested);

                const total = Object.values(distribution).reduce((acc, value) => acc + value, 0);
                const normalizedDistribution = Object.fromEntries(
                    Object.entries(distribution).map(([key, value]) => [key, ((value / total) * 100).toFixed(2)])
                );
                setInvestmentDistribution(normalizedDistribution);
            } catch (error) {
                console.error('Error fetching quick overview data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchQuickOverviewData();
    }, []);

    const data = {
        labels: Object.keys(investmentDistribution),
        datasets: [
            {
                data: Object.values(investmentDistribution),
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
                hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'],
            },
        ],
    };

    const options = {
        plugins: {
            legend: {
                display: true,
                position: 'bottom',
                labels: {
                    font: {
                        size: 12,
                    },
                },
            },
        },
    };

    return (
        <div className="quick-overview">
            <div className="quick-overview-info">
                <h4 className="quick-overview-title">Quick Overview</h4>
                <div>
                    <span className="quick-overview-label">Balance:</span>
                    <span className="quick-overview-value">${balance.toFixed(2)}</span>
                </div>
                <div>
                    <span className="quick-overview-label">Invested:</span>
                    <span className="quick-overview-value">${invested.toFixed(2)}</span>
                </div>
            </div>
            <div className="quick-overview-chart">
                <Pie data={data} options={options} />
            </div>
        </div>
    );
};

export default QuickOverview;
