"use client"

import React, { useEffect, useState } from 'react';
import { removeCookie } from '../data/helper';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import { searchApi } from '../lib/api/auth';


// Define an interface for the job data
interface JobData {
  job_name: string;
  company_name: string;
  job_full_text: string;
  post_url: string;
  post_apply_url: string;
  company_url: string;
  city: string;
  region: string;
  country: string;
  job_published_at: string;
  last_indexed: string;
}

const DashboardPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState<JobData[]>([]);

  let removeTokenTimeout: NodeJS.Timeout | undefined;

  const startTokenTimeout = () => {
    removeTokenTimeout = setTimeout(() => {
      removeCookie('token');
      console.log('Token expired and removed.');
      router.push('/login');
    }, 1800000);
  };

  useEffect(() => {
    const token = getCookie('token');

    if (token) {
      console.log('Token exists on dashboard page.');
      startTokenTimeout();
    } else {
      console.log('No token found on dashboard page.');
      router.push('/login');
    }

    return () => {
      if (removeTokenTimeout) {
        clearTimeout(removeTokenTimeout);
      }
    };
  }, []);

  const handleSearch = async () => {
    try {
      const data = await searchApi(searchTerm);
      setTableData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div>
        <h1 className='mb-5'>JOB SEARCH</h1>
      </div>
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button
          className="btn btn-primary"
          type="button"
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {searchTerm && tableData.length > 0 && (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Sr No.</th>
                <th>JOB NAME</th>
                <th>COMPANY NAME</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.job_name}</td>
                  <td>{item.company_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Handle case where no results are found */}
      {searchTerm && tableData.length === 0 && (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default DashboardPage;
