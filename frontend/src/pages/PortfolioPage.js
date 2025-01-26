import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPortfolio } from '../redux/actions/portfolioActions';
import StatisticsPanel from '../components/StatisticsPanel';
import HoldingList from '../components/HoldingList';
import TransactionTable from '../components/TransactionTable';
import TransactionForm from '../components/TransactionForm';
import { useNavigate } from 'react-router-dom';
import ProfitChart from '../containers/ProfitChart';
import NaviBar from "../components/NaviBar";
import QuickOverview from '../containers/QuickOverview_changed';
import '../styles/PortfolioPage.css';

const PortfolioPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { portfolios, loading, error } = useSelector(state => state.portfolio);

    // console.log('PortfolioPage loaded, portfolio:', portfolios);

    const portfolio = portfolios && portfolios.length > 0 ? portfolios[0] : null;
    // console.log('holdings:', portfolio?.holdings); 
    const transactions = portfolio?.holdings
        ? portfolio.holdings.flatMap(holding => holding.transactions)
        : [];

    // console.log('transactions:', transactions);

    // get portfolio data when component is loaded
    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log('PortfolioPage loaded, access token:', token);

        if (token) {
            dispatch(getPortfolio());
        } else {
            console.warn('Access token not found, redirecting to login.');
            navigate('/login');
        }
    }, [dispatch, navigate]);
    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }
    return (
        <div className="page-container">
            <div className="navi-bar">
                <NaviBar />
            </div>
            <div className="main-content">
                <div className="row first-row">
                    <div className="quick-overview">
                        <QuickOverview />
                    </div>
                    <div className="profit-chart">
                        <ProfitChart />
                    </div>
                </div>
                <div className="row holding-list">
                    <HoldingList data={portfolio?.holdings || []} />
                </div>
                <div className="row transaction-table">
                    <TransactionTable data={transactions || []} />
                </div>
            </div>
        </div>
    );
};


export default PortfolioPage;