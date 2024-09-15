import Link from 'next/link';

interface FilterFormProps {
  makes: { MakeName: string; MakeId: number }[];
  onMakeChange: (makeId: string) => void;
  onYearChange: (year: number) => void;
  selectedMakeId: string | undefined;
  selectedYear: number | undefined;
}

const currentYear = new Date().getFullYear();

const FilterForm: React.FC<FilterFormProps> = ({
  makes,
  onMakeChange,
  onYearChange,
  selectedMakeId,
  selectedYear,
}) => {
  const isDisabled = !selectedMakeId || !selectedYear;
  const linkHref = isDisabled
    ? '#'
    : `/result/${selectedMakeId}/${selectedYear}`;

  return (
    <form className="bg-gray-800 p-8 rounded-lg shadow-xl space-y-6 max-w-md mx-auto text-white">
      <div>
        <label htmlFor="make" className="block text-lg font-medium mb-2">Select Make</label>
        <select
          id="make"
          value={selectedMakeId || ''}
          onChange={(e) => onMakeChange(e.target.value)}
          className="block w-full border border-gray-700 rounded-lg shadow-sm bg-gray-900 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        >
          <option value="">Select a make</option>
          {makes.map((make) => (
            <option key={make.MakeId} value={make.MakeId}>{make.MakeName}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="year" className="block text-lg font-medium mb-2">Select Year</label>
        <select
          id="year"
          value={selectedYear || ''}
          onChange={(e) => onYearChange(parseInt(e.target.value))}
          className="block w-full border border-gray-700 rounded-lg shadow-sm bg-gray-900 text-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200 ease-in-out"
        >
          <option value="">Select a year</option>
          {Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i).map((year) => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <Link
          href={linkHref}
          className={`inline-block px-6 py-3 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 transition duration-300 ease-in-out ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          aria-disabled={isDisabled}
        >
          Next
        </Link>
      </div>
    </form>
  );
};

export default FilterForm;
