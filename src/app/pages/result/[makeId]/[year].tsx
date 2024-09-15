import VehicleList from '../../../components/VehicleList';
import { getStaticProps } from '../../../lib/getStaticProps';
import { getStaticPaths } from '../../../lib/getStaticPaths';

interface ResultPageProps {
  vehicles: any[];
}

const ResultPage = ({ vehicles }: ResultPageProps) => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white py-12 px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h1 className="text-3xl font-extrabold text-center">Vehicle Models</h1>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-800 shadow rounded-lg px-4 py-6 sm:px-10">
          <VehicleList vehicles={vehicles} />
        </div>
      </div>
    </div>
  );
};

export { getStaticProps, getStaticPaths };

export default ResultPage;
