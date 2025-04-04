import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Client from "../components/Client";
import financial from "../assets/financial.jpeg";

const Financial = () => {
  const [financialData, setFinancialData] = useState({});
  const [selectedYear, setSelectedYear] = useState("2024");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Fetch data from the JSON file
    const fetchData = async () => {
      try {
        // In a real application, you would use a fetch call or import
        // This example assumes the JSON file is available via an import or direct fetch
        const response = await fetch('/Financial.json');
        const data = await response.json();
        setFinancialData(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching financial data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const years = Object.keys(financialData.records || {}).sort((a, b) => b - a);
  
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMonths = months.slice(indexOfFirstItem, indexOfLastItem);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const totalPages = Math.ceil(months.length / itemsPerPage);

  return (
    <div className="relative w-full min-h-screen">
      {/* Navigation Bar */}
      <Navbar />

      {/* Hero Section */}
      <div
        className="w-full h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen flex items-center justify-center text-white text-center bg-cover bg-center relative"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${financial})`,
        }}
      >
        <div className="max-w-4xl px-4">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold drop-shadow-lg mb-3 sm:mb-4 md:mb-6 leading-relaxed tracking-wide sm:tracking-widest">
            Financial Services <br />
            Supporting Your Business Growth
          </h1>
        </div>
      </div>

      {/* Financial Records Table Section */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Financial Records</h2>
        <p className="text-gray-600 text-center mb-8">Monthly financial reports from 2021 to 2024</p>
        
        {/* Year Selection Tabs */}
        <div className="flex justify-center mb-6 overflow-x-auto">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {years.map((year) => (
                <button
                  key={year}
                  onClick={() => {
                    setSelectedYear(year);
                    setCurrentPage(1); // Reset to first page when changing year
                  }}
                  className={`${
                    selectedYear === year
                      ? "border-[#d20000] text-[#d20000]"
                      : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm sm:text-base`}
                >
                  {year}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-500">Loading financial data...</p>
          </div>
        ) : (
          <>
            {/* Reports Table */}
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Month
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentMonths.map((month) => (
                    <tr key={month} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {month}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {financialData.records && 
                         financialData.records[selectedYear] && 
                         financialData.records[selectedYear][month] ? 
                          financialData.records[selectedYear][month].description : 
                          `Financial report for ${month} ${selectedYear}`}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button
                          className="text-[#d20000] hover:text-[#ff0000]"
                          onClick={() => {
                            // Here you would handle opening the PDF or other action
                            alert(`Download ${month} ${selectedYear} report`);
                          }}
                        >
                          View Report
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6 mt-4">
              <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                    <span className="font-medium">
                      {Math.min(indexOfLastItem, months.length)}
                    </span>{" "}
                    of <span className="font-medium">{months.length}</span> results
                  </p>
                </div>
                <div>
                  <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
                    <button
                      onClick={() => paginate(Math.max(currentPage - 1, 1))}
                      disabled={currentPage === 1}
                      className={`relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                        currentPage === 1 ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Previous</span>
                      &larr;
                    </button>
                    
                    {[...Array(totalPages)].map((_, i) => (
                      <button
                        key={i + 1}
                        onClick={() => paginate(i + 1)}
                        className={`relative inline-flex items-center px-4 py-2 text-sm font-semibold ${
                          currentPage === i + 1
                            ? "bg-[#d20000] text-white focus:z-20"
                            : "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20"
                        }`}
                      >
                        {i + 1}
                      </button>
                    ))}
                    
                    <button
                      onClick={() => paginate(Math.min(currentPage + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className={`relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 ${
                        currentPage === totalPages ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-50"
                      }`}
                    >
                      <span className="sr-only">Next</span>
                      &rarr;
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Client Footer */}
      <Client />
    </div>
  );
};

export default Financial;