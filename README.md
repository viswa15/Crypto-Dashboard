# Crypto Dashboard ![Crypto Dashboard Logo](https://res.cloudinary.com/dgl0v7vwf/image/upload/v1758553698/Screenshot_2025-09-22_203116_ltmnmx.png)

A production-like crypto dashboard built with React, Vite, and TypeScript, focusing on clean architecture, performance, and a polished user experience. This application fetches live market data from the CoinGecko API and presents it in a responsive and interactive interface.

### [Live Demo Link](https://crypto-dashboard-fyrn.vercel.app/) 

## ✨ Features

* **Live Market Data**: Fetches and displays real-time cryptocurrency data from the CoinGecko API.
* **Interactive Main Table**: A paginated view of top cryptocurrencies with client-side searching and sorting by price, market cap, and more.
* **Highlights Section**: At-a-glance cards for "Trending Coins," "Top Gainers," and "Top Losers."
* **"View More" Pages**: Dedicated, paginated pages for each highlight category, allowing users to explore the full lists.
* **Coin Detail Modal**: Click on any coin in the table to view its key statistics in a clean, accessible modal.
* **Polished UI/UX**: A modern, dark-themed interface with a sticky navbar, subtle animations, and consistent visual feedback on interactive elements.
* **Resilient Data Fetching**: Utilizes TanStack Query for robust caching, background refetching, and clear loading/error states.

## 🛠️ Tech Stack & Architecture

* **Framework**: React with Vite
* **Language**: TypeScript
* **Styling**: Tailwind CSS
* **Data Fetching & State Management**: TanStack Query (React Query)
* **Routing**: React Router DOM
* **Testing**: **Vitest**, **React Testing Library**, and **MSW** for API mocking.
* **API Client**: Axios
* **Icons**: Lucide React

The project follows a clean, feature-oriented structure to promote **Separation of Concerns**:
* `src/components`: Contains reusable UI components, divided into `layout`, `dashboard`, and generic `ui` folders.
* `src/hooks`: Encapsulates data-fetching and other complex logic.
* `src/pages`: Defines the components for each route in the application.
* `src/lib`: Manages the API service layer, including the crucial Adapter Pattern.
* `src/types`: Centralizes all TypeScript type definitions for the domain models.

## 🧪 Testing Strategy

The application includes a comprehensive test suite to ensure reliability and prevent regressions.

* **Unit & Integration Tests**: We use a combination of unit tests for small, isolated components (e.g., `PriceChange`) and integration tests for more complex components that involve user interaction (e.g., searching and sorting the `CoinsTable`).
* **API Mocking**: All API requests are intercepted using **Mock Service Worker (MSW)**. This ensures that tests are fast, reliable, and independent of the live API, allowing us to test loading, success, and error states predictably.
* **User Interaction Simulation**: User interactions like typing and clicking are simulated using `@testing-library/user-event` to mimic real-world usage as closely as possible.

## 🧠 Design Patterns & Rationale

This project was built with a strong emphasis on applying design patterns to solve real-world problems, as required by the evaluation criteria.

### 1. Adapter Pattern
The API service in `src/lib/api.ts` acts as an adapter. It fetches raw data from the CoinGecko API and immediately maps it to a clean, internal `Coin` domain model. This decouples the entire application from the external API's data structure, preventing breaking changes and making the UI components predictable and easy to work with.

### 2. Component Composition & Separation of Concerns
The application is composed of small, single-purpose components. The main `App.tsx` file is kept clean and is only responsible for routing. The page structure is managed by a dedicated `Layout` component (`src/components/layout/Layout.tsx`), which in turn uses a `Navbar` component. This adheres to the Single Responsibility Principle and makes the codebase highly readable and maintainable.

### 3. Custom Hook Pattern
All data-fetching logic is abstracted into custom hooks (e.g., `useCoins`, `useFullCoinList`). This pattern encapsulates the complexity of TanStack Query, providing a simple, declarative API to the UI components (e.g., `const { data, isLoading } = useCoins()`). This makes the page components cleaner and focused only on presentation.

### 4. Client-Side Data Strategy & The Enterprise Alternative

#### The Chosen Approach: Client-Side Pagination
The "View More" pages for Top Gainers and Losers fetch a large list of 250 coins and perform sorting and pagination on the client. For a list of this size, this strategy is highly effective. It provides an instantaneous user experience for sorting and paging without the latency of additional network requests, offering the best balance of performance and implementation simplicity for this project's scope.

#### The Enterprise-Level Alternative: List Virtualization
For a true **enterprise-level application** that might need to display thousands or tens of thousands of rows, client-side pagination would become inefficient. The advanced alternative is **List Virtualization** (or "Windowing").

* **How it Works**: Instead of rendering all 250+ table rows in the DOM at once, a virtualization library (like `TanStack Virtual` or `react-window`) only renders the handful of rows currently visible in the user's viewport. As the user scrolls, it recycles the existing DOM nodes and replaces their content, keeping the application extremely fast and memory-efficient.

* **Why it's Better at Scale**: This approach guarantees a smooth, "jank-free" infinite-scrolling experience, which is crucial for performance and usability when dealing with massive datasets. It keeps the DOM lightweight, ensuring the application remains responsive on all devices. While more complex to implement, it is the superior choice for applications where data scalability is a primary concern.

## 🚀 Setup and Run Instructions

1.  **Clone the repository:**
    ```bash
    git clone [your-repo-link]
    cd crypto-dashboard
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Set up environment variables:**
    * Create a `.env.local` file in the root of the project by copying the example file:
        ```bash
        cp .env.example .env.local
        ```
    * Add your free CoinGecko API key to the `.env.local` file:
        ```
        VITE_COINGECKO_API_KEY=your_api_key_here
        ```

4.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be available at `http://localhost:5173`.

5.  **Run Tests:**
    ```bash
    # Run tests in the terminal
    npm run test

    # Open the interactive Test UI
    npm run test:ui
    ```

## 📝 Assumptions, Limitations, & Future Improvements

* **Assumptions**: The CoinGecko API is considered the single source of truth and is assumed to be available and reliable.
* **Limitations**:
    * The "Top Gainers" and "Top Losers" lists are derived from the top 250 cryptocurrencies by market cap, not the entire market. This is a practical limitation of the CoinGecko API's free tier.
    * Pricing data is not real-time and is subject to the caching and refetching intervals set by TanStack Query (currently 5-10 minutes).
* **Future Improvements**:
    * **Implement List Virtualization**: As discussed in the rationale, replace client-side pagination on the "View More" pages with a virtualized list to handle much larger datasets with an infinite-scroll experience.
    * **Real-time Updates**: Implement WebSockets to stream live price updates for a true trading-desk experience.
    * **Advanced Charting**: Integrate a charting library (like Chart.js or Lightweight Charts) into the coin detail modal to show historical price data.
    * **User Accounts & Watchlists**: Add user authentication to allow for personalized watchlists and portfolio tracking.