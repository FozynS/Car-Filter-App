'use client';
import { useState, useEffect } from 'react';
import FilterForm from './components/FilterForm';
import { ApiResponse } from './types/ApiResponse';

const HomePage = () => {
  const [makes, setMakes] = useState<{ MakeName: string; MakeId: number }[]>([]);
  const [selectedMakeId, setSelectedMakeId] = useState<string | undefined>(undefined);
  const [selectedYear, setSelectedYear] = useState<number | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchMakes() {    
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`);
        if (!res.ok) {
          throw new Error('Failed to fetch vehicle makes');
        }
        const data: ApiResponse = await res.json();
        const makesData = data.Results.map(item => ({
          MakeName: item.MakeName,
          MakeId: item.MakeId
        }));

        setMakes(makesData);
      } catch (error) {
        setError('Error fetching vehicle makes. Please try again later.');
        console.error('Error fetching vehicle makes:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchMakes();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 p-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-lg shadow-2xl border border-gray-700">
        <h1 className="text-3xl font-extrabold mb-6 text-white">Filter Vehicles</h1>
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="w-12 h-12 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <p className="text-red-400 text-center text-lg font-medium">{error}</p>
        ) : (
          <FilterForm
            makes={makes}
            onMakeChange={setSelectedMakeId}
            onYearChange={setSelectedYear}
            selectedMakeId={selectedMakeId}
            selectedYear={selectedYear}
          />
        )}
      </div>
    </div>
  );
};

export default HomePage;
