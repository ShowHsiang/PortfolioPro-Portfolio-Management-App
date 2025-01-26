# Portfolio Management Application: PortfolioPro

## General (6 points)

### Problem Statement
The financial market is highly fragmented, with various data sources for stocks, cryptocurrencies, and other assets. Currently, there is no unified system for managing a comprehensive asset portfolio. This project aims to provide a single platform that integrates multiple financial data sources, offers portfolio management capabilities, and visualizes financial insights. It is highly relevant for individual investors and financial advisors, addressing challenges in tracking and analyzing multiple financial markets in one place.

### Solution Architecture
The application architecture is designed for modularity and extensibility:
- **Frontend**: React with reusable components for enhanced user experience.
- **Backend**: Django with a multi-app structure, enabling easy addition of features and APIs.
- **Integration**: APIs for financial market data (stocks, crypto) and an AI-powered chatbot for financial queries.
- **Visualization**: Dynamic charts and tables for portfolio insights and market trends.
- **Chatbot System Prompt**: XAI chatbot acts as a financial and portfolio management expert.




### Legal/Business Model
- The project is **open source**, allowing collaboration and innovation from the community.
- It can be extended into a **commercial model** with premium features such as advanced analytics, forecasting, and personalized recommendations.
- API keys and other sensitive information are securely managed using `.env` files.

### Competition Analysis
Competitors include platforms like Robinhood, Binance, and Personal Capital. Unlike these solutions, our platform provides:
- Integration of multiple data sources for comprehensive portfolio management.
- An extensible backend structure for future growth.
- An AI chatbot to assist users with financial questions.

---

## Implementation (12 points)

### Front-end Design and Implementation
1. **Design**:
   - Figma as designing reference tool.
   - Responsive and user-friendly UI.
   - Interactive chatbot interface.
   - Intuitive navigation between pages.
   - Consistent color scheme and typography.
2. **Features**:
   - Dynamic stock and crypto market data visualization.
   - Real-time chatbot interaction with loading animations.
   - Form validation and error handling for better usability.
3. **Technologies**:
   - **React**: Component-based architecture.
   - **Axios**: For seamless API calls.
   - **CSS**: Custom styles for responsive design.
   - **Chart.js**: For data visualization.

### Back-end Design and Implementation
1. **Architecture**:
   - Modular, extensible **Django multi-app structure**.
   - Separate apps for:
     - Market API integration.
     - User management.
     - Chatbot functionality.
   - Database to store historical financial data and reduce API calls.
2. **Features**:
   - **API Integration**:
     - **XAI API**: Interactive financial chatbot.
     - **Yahoo Finance API**: Real-time and historical stock data.
     - **CoinGecko API**: Cryptocurrency market data.
     - **Binance API**: Real-time crypto trading information.
     - Modular design allows easy addition of new APIs.
   - **Data Handling**:
     - Periodic data refresh mechanism to reduce API usage.
     - Backend API endpoints to serve data efficiently.
3. **Technologies**:
   - **Python**: Backend logic.
   - **Django**: REST API development and app structure.
   - **SQLite**: Lightweight database for data storage.

### Integration
- **Frontend-backend communication**: RESTful APIs handle seamless data flow.
- **Unified system**: Combines data from multiple APIs for user-friendly insights.

#### Project File Structure
#### Backend (`backend`)
```plaintext

backend/
├── requirements.txt          # Dependency declarations
├── Dockerfile                # Docker build file
├── .env                      # Environment variable configurations
├── entrypoint.sh             # Container startup script
├── manage.py                 # Django management script
├── users/                    # User module
│   ├── models.py             # User models
│   ├── serializers.py        # User serializers
│   ├── views.py              # User-related views
│   ├── urls.py               # User-specific routing
│   ├── admin.py              # Admin registration for user models
│   ├── apps.py               # Application configuration for users
│   ├── migrations/           # Database migration files
├── portfolio/                # Portfolio management module
│   ├── models.py             # Portfolio-related models
│   ├── serializers.py        # Portfolio serializers
│   ├── views.py              # Portfolio views
│   ├── urls.py               # Portfolio routing
│   ├── admin.py              # Admin registration for portfolio models
│   ├── apps.py               # Application configuration for portfolios
│   ├── migrations/           # Database migration files
├── market/                   # Market data module
│   ├── models.py             # Market-related models
│   ├── serializers.py        # Market serializers
│   ├── views.py              # Market views
│   ├── urls.py               # Market routing
│   ├── utils.py              # Helper utilities for market data
│   ├── scraper/              # Web scraping logic
│   │   ├── market_scraper.py # Market data scraping script
│   ├── migrations/           # Database migration files
```
#### Frontend (`frontend`)

```plaintext

frontend/
├── Dockerfile                # Docker build file
├── package.json              # Dependency declarations and scripts
├── .env                      # Environment variable configurations
├── public/                   # Static files
│   ├── index.html            # Main HTML file
├── src/                      # Source code
│   ├── App.js                # Main React component
│   ├── index.js              # React entry point
│   ├── components/           # Reusable UI components
│   ├── containers/           # Containers with business logic
│   ├── pages/                # Page-level components
│   │   ├── Homepage.js       # Homepage
│   │   ├── MarketPage.js     # Market data page
│   │   ├── NewsPage.js       # News page
│   │   ├── Login.js          # Login page
│   │   ├── Register.js       # Register page
│   ├── redux/                # Redux state management
│   │   ├── actions/          # Redux action creators
│   │   ├── reducers/         # Redux reducers
│   │   ├── store.js          # Redux store configuration
│   ├── styles/               # Styling files
│   ├── reportWebVitals.js    # Web vitals performance monitoring
```

### Tech Stack
#### **Frontend**
- **React**: For building a dynamic and interactive user interface.
- **Redux**: For state management, handling global application state like user data and market information.
- **Material-UI (MUI)**: For styling and responsive design.
- **Axios**: For making HTTP requests to the backend.
- **Recharts & ApexCharts**: For data visualization and building charts.
- **React Router**: For managing navigation between different pages.

#### **Backend**
- **Django**: As the core framework for building APIs and handling business logic.
- **Django REST Framework (DRF)**: For creating RESTful APIs.
- **PostgreSQL**: For storing user data, portfolios, and market information.
- **Environment Management**: `.env` for securely managing secrets and API keys.
- **Docker**: For containerization and ensuring consistent deployment.

#### **Other Tools**
- **Web Scraping**: Using Beautiful Soup for fetching additional market data.
- **API Integrations**: Integration with Alpha Vantage, Binance, and other market data providers.

---

## Webpage Features and User Guide

**ProfolioPro** is an AI-powered portfolio management application. Users need to first register an account and log in to access the platform. The website features are divided into four main sections: **HomePage**, **Markets**, **Portfolio**, and **News**.

### **1. HomePage**
- **Quick Overview**: View your balance, total investment amount, and a pie chart illustrating your portfolio distribution.
- **Top Assets**: Displays your top holdings in stocks or cryptocurrency products.
- **Watchlist**: Highlights financial products that you are actively monitoring.
- **AI Assistant**: A unique feature of the platform that provides market analysis and investment insights.

### **2. Markets**
- Displays stock market trends across major global regions.
- Features "Top Losers/Gainers" for quick insights into market movements.
- Allows users to add financial products of interest to their watchlist.
- Provides **Candlestick Charts** for assets, offering detailed market analysis.

### **3. Portfolio**
- Showcases your asset details and the performance trends of financial products over different time periods.
- Includes profit/loss curves for your holdings.
- Provides a detailed breakdown of your portfolio assets and transaction history.

### **4. News**
- Offers the latest trending news from diverse categories, including:
  - **Business**
  - **Technology**
  - **Entertainment**
  - **Health**
  - **Science**
  - **Sports**

## **How to Use ProfolioPro**
1. **Register and Log In**: Create an account to access all features.
2. **Add to Watchlist**: Navigate to the **Markets** section and add your preferred financial products to the watchlist.
3. **Record Transactions**: Go to the **Portfolio** section and input your transaction details.
4. **Analyze Your Portfolio**: View charts, graphs, and AI-driven insights in the **Portfolio** section to understand your financial profile better.

---

## Misc Software Engineering Aspects (3 points)

### Documentation
- Figma design references.
- Code comments at function level for clarity.
- Detailed README with feature explanations.

### Usability
- Intuitive UI with clear navigation and input validation.
- Error messages guide users for incorrect inputs.

### Modularization/Library Integration
- Frontend uses reusable React components.
- Backend apps designed for modular functionality.

### Code Originality
- All core functionality implemented from scratch.
- Acknowledgement of third-party APIs and libraries.

---

## Novel Features (10 points)

### Front-end
- Chatbot interface with real-time loading animations.
- Advanced charting for stocks and cryptocurrencies.
- Form validation to improve user experience.
- Managing Global Application State with Redux.

### Back-end
- Modular Django multi-app architecture.
- Integration of multiple financial APIs for stocks and crypto.
- Dynamic endpoint to serve chatbot conversations and market data.

### APIs
1. **XAI API**: Financial chatbot for personalized advice.
2. **Yahoo Finance API**: Real-time stock prices and historical data.
3. **CoinGecko API**: Cryptocurrency market data.
4. **Binance API**: Crypto trading and market data.
5. **Extensibility**: New APIs can be added easily due to the modular backend.

---

## Presentation (4 points)

The final presentation provides an in-depth demonstration of the application, its architecture, and features. 
[Presentation Video](https://drive.google.com/file/d/12XFp24IKUtWnYLGIpI6ZZLmiYCLG5KHb/view?usp=sharing) .

---

## Final Submission Checklist
1. Latest code with all features and components.
2. Updated README file with complete documentation.
3. Continuous commits showcasing progress throughout development.
4. Presentation uploaded and accessible.

---

**Project Contributors**
- Huang Hejia, A0274451E, Backend and Database
- Xiang Xiaoneng, A0274509X, Frontend and UI design

---




## Running the Application
 
1.	Build and Start the Containers
Run the following command to build and start the backend, frontend, and database containers:
```
docker-compose up --build
```

2.	Access the Application
•	Frontend: Open http://localhost:3000 in your browser.
•	Backend API: The Django API is available at http://localhost:8000.

3. Clear Docker
```
docker-compose down --volumes --remove-orphans
```

**Note:**

1. If you encounter permission problems with entrypoint.sh during execution, please also give entrypoint.sh execution permission locally:
```
chmod +x backend/entrypoint.sh
``` 
2. If you encounter an error that there is no entrypoint.sh file, please note that Windows OS is different from Linux/Unix OS. If you use Windows OS, you can use dos2unix to convert locally:
```
dos2unix backend/entrypoint.sh
```
