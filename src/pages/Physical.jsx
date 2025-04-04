import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Client from "../components/Client";
import physical from "../assets/physical.jpeg";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Enhanced Theme colors
const THEME = {
  primary: "#d20000",
  primaryLight: "#ff5252",
  primaryDark: "#9b0000",
  secondary: "#1a1a1a",
  lightGray: "#f5f6fa",
  white: "#ffffff",
  success: "#00cc66",
  warning: "#ffaa00",
  info: "#007bff",
  text: {
    primary: "#1a1a1a",
    secondary: "#4a4a4a",
    light: "#ffffff"
  },
  gradient: "linear-gradient(135deg, #d20000, #ff5252)"
};

const Physical = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/Physical.json');
        if (!response.ok) throw new Error('Failed to fetch data');
        const jsonData = await response.json();
        setData(jsonData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // Enhanced color generation with gradients
  const generateColors = (count) => {
    const vibrantColors = [
      '#ff6b6b', '#4ecdc4', '#45b7d1', '#96c93d', 
      '#ff9f43', '#6c5ce7', '#ff7675', '#00b894'
    ];
    return Array.from({ length: count }, (_, i) => ({
      background: vibrantColors[i % vibrantColors.length],
      hover: `${vibrantColors[i % vibrantColors.length]}cc`
    }));
  };

  // Chart data preparation with enhanced styling
  const chartConfigs = {
    pie: (labels, values) => {
      const colors = generateColors(labels.length);
      return {
        labels,
        datasets: [{
          data: values,
          backgroundColor: colors.map(c => c.background),
          hoverBackgroundColor: colors.map(c => c.hover),
          borderColor: THEME.white,
          borderWidth: 2,
          hoverBorderWidth: 3
        }]
      };
    },
    bar: (labels, values, label) => {
      const colors = generateColors(labels.length);
      return {
        labels,
        datasets: [{
          label,
          data: values,
          backgroundColor: colors.map(c => c.background),
          hoverBackgroundColor: colors.map(c => c.hover),
          borderColor: THEME.white,
          borderWidth: 2,
          borderRadius: 8,
          barThickness: 30
        }]
      };
    }
  };

  // Chart options with enhanced customization
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'right',
        labels: {
          font: { family: "'Poppins', sans-serif", size: 14, weight: 'bold' },
          color: THEME.text.primary,
          padding: 20,
          usePointStyle: true
        }
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        titleFont: { family: "'Poppins', sans-serif", size: 16, weight: 'bold' },
        bodyFont: { family: "'Poppins', sans-serif", size: 14 },
        padding: 12,
        cornerRadius: 8
      },
      animation: {
        animateScale: true,
        animateRotate: true
      }
    }
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          font: { family: "'Poppins', sans-serif", size: 14, weight: 'bold' },
          color: THEME.text.primary
        }
      },
      title: {
        display: true,
        font: { family: "'Poppins', sans-serif", size: 20, weight: 'bold' },
        color: THEME.text.primary,
        padding: 20
      },
      tooltip: {
        backgroundColor: 'rgba(26, 26, 26, 0.9)',
        titleFont: { family: "'Poppins', sans-serif", size: 16, weight: 'bold' },
        bodyFont: { family: "'Poppins', sans-serif", size: 14 },
        padding: 12,
        cornerRadius: 8
      }
    },
    scales: {
      x: {
        grid: { display: false },
        ticks: { font: { family: "'Poppins', sans-serif", size: 12 } }
      },
      y: {
        grid: { color: 'rgba(0, 0, 0, 0.05)' },
        ticks: { font: { family: "'Poppins', sans-serif", size: 12 } }
      }
    },
    animation: {
      duration: 1500,
      easing: 'easeOutBounce'
    }
  };

  // Data preparation functions
  const getSalesByRegionData = () => data && chartConfigs.pie(
    data.salesDistribution.byRegion.map(item => item.region),
    data.salesDistribution.byRegion.map(item => item.percentage)
  );

  const getSalesByProductData = () => data && chartConfigs.pie(
    data.salesDistribution.byProduct.map(item => item.product),
    data.salesDistribution.byProduct.map(item => item.percentage)
  );

  const getProductionCapacityData = () => data && chartConfigs.bar(
    data.productionCapacity.byMineralType.map(item => item.name),
    data.productionCapacity.byMineralType.map(item => item.capacity),
    'Production Capacity (metric tons)'
  );

  const getQuarterlyPerformanceData = () => data && chartConfigs.bar(
    data.quarterlyPerformance.production.labels,
    data.quarterlyPerformance.production.data,
    'Production (metric tons)'
  );

  const getQuarterlyRevenueData = () => data && chartConfigs.bar(
    data.quarterlyPerformance.revenue.labels,
    data.quarterlyPerformance.revenue.data.map(value => value / 1000000),
    'Revenue (Millions USD)'
  );

  if (loading) {
    return (
      <div className="relative w-full min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-r-4" 
               style={{ borderColor: `${THEME.primary} transparent ${THEME.primaryLight}` }}></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full min-h-screen bg-gray-100">
        <Navbar />
        <div className="flex justify-center items-center h-screen">
          <div className="text-2xl p-10 rounded-2xl bg-white shadow-2xl transform rotate-2" 
               style={{ color: THEME.warning, border: `2px solid ${THEME.warning}` }}>
            Error: {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-gray-100 font-['Poppins'] antialiased">
      <Navbar />
      
      {/* Enhanced Hero Section */}
      <div className="w-full h-[70vh] md:h-[85vh] flex items-center justify-center text-white text-center bg-cover bg-center relative overflow-hidden"
           style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url(${physical})` }}>
        <div className="max-w-6xl px-8 py-16 animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-wide drop-shadow-lg">
            Company Performance Dashboard
          </h1>
        </div>
       
      </div>

      {/* Main Content */}
      {data && (
        <div className="py-20 px-6 lg:px-12" style={{ background: THEME.lightGray }}>
          <div className="max-w-7xl mx-auto space-y-24">
            {/* Company Overview */}
            <section className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: THEME.secondary }}>
                Company Overview
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Founded', value: data.companyOverview.yearFounded },
                  { title: 'Employees', value: data.companyOverview.employees.toLocaleString() },
                  { title: 'Sites', value: data.companyOverview.operationalSites }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                       style={{ borderTop: `4px solid ${THEME.primary}` }}>
                    <h3 className="text-xl font-semibold mb-4" style={{ color: THEME.primary }}>{item.title}</h3>
                    <p className="text-5xl font-extrabold" style={{ color: THEME.secondary }}>{item.value}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Financial Metrics */}
            <section className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: THEME.secondary }}>
                Financial Performance
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  { title: 'Revenue', value: `$${(data.financialMetrics.revenue.current / 1000000000).toFixed(2)}B`, growth: data.financialMetrics.revenue.growth },
                  { title: 'Profit Margin', value: `${data.financialMetrics.profitMargin.current.toFixed(1)}%`, growth: data.financialMetrics.profitMargin.growth },
                  { title: 'CapEx', value: `$${(data.financialMetrics.capitalExpenditure.current / 1000000).toFixed(0)}M`, growth: data.financialMetrics.capitalExpenditure.growth }
                ].map((item, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                       style={{ borderTop: `4px solid ${THEME.info}` }}>
                    <h3 className="text-xl font-semibold mb-42" style={{ color: THEME.info }}>{item.title}</h3>
                    <p className="text-5xl font-extrabold my-4" style={{ color: THEME.secondary }}>{item.value}</p>
                    <p className="text-lg" style={{ color: THEME.success }}>+{item.growth.toFixed(1)}% YoY</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Sales Distribution */}
            <section className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: THEME.secondary }}>
                Sales Distribution
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {[
                  { title: 'By Region', data: getSalesByRegionData() },
                  { title: 'By Product', data: getSalesByProductData() }
                ].map((chart, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-xl">
                    <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: THEME.primary }}>{chart.title}</h3>
                    <div className="h-96">
                      <Pie data={chart.data} options={pieOptions} />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Production Capacity */}
            <section className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: THEME.secondary }}>
                Production Capacity
              </h2>
              <div className="bg-white p-8 rounded-2xl shadow-xl">
                <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: THEME.primary }}>
                  Capacity by Mineral Type
                </h3>
                <div className="h-96">
                  <Bar data={getProductionCapacityData()} options={barOptions} />
                </div>
                <div className="mt-8 text-center space-y-2">
                  <p className="text-2xl font-semibold" style={{ color: THEME.secondary }}>
                    Total: {(data.productionCapacity.total / 1000000).toFixed(1)}M tons
                  </p>
                  <p className="text-lg" style={{ color: THEME.text.secondary }}>
                    Utilization: {data.productionCapacity.utilizationRate}%
                  </p>
                </div>
              </div>
            </section>

            {/* Quarterly Performance */}
            <section className="animate-fade-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-12 text-center" style={{ color: THEME.secondary }}>
                Quarterly Performance
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {[
                  { title: 'Production Volume', data: getQuarterlyPerformanceData() },
                  { title: 'Revenue', data: getQuarterlyRevenueData() }
                ].map((chart, index) => (
                  <div key={index} className="bg-white p-8 rounded-2xl shadow-xl">
                    <h3 className="text-2xl font-semibold mb-6 text-center" style={{ color: THEME.primary }}>{chart.title}</h3>
                    <div className="h-96">
                      <Bar data={chart.data} options={barOptions} />
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      )}
      
      <Client />
    </div>
  );
};

export default Physical;