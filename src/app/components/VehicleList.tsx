import React from 'react';

interface VehicleListProps {
  vehicles: any[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  console.log(vehicles);
  return (
    <div className="space-y-4">
      {vehicles.length === 0 ? (
        <p className="text-center text-gray-400">No vehicles found.</p>
      ) : (
        vehicles.map((vehicle) => (
          <div key={vehicle.id} className="p-4 bg-gray-700 rounded-lg shadow">
            <h2 className="text-xl font-semibold text-white">{vehicle.name}</h2>
            <p className="text-gray-300">Model: {vehicle.model}</p>
            <p className="text-gray-300">Year: {vehicle.year}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default VehicleList;
