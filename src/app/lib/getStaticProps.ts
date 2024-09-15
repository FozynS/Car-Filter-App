import { GetStaticProps } from 'next';

interface ResultPageProps {
  vehicles: any[];
}

export const getStaticProps: GetStaticProps<ResultPageProps> = async ({ params }) => {
  const { makeId, year } = params as { makeId: string; year: string };
  let vehicles = [];

  console.log('Fetching data for:', makeId, year);

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetModelsForMakeIdYear/makeId/${makeId}/modelyear/${year}?format=json`);
    if (!res.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await res.json();
    vehicles = data.Results || [];
  } catch (error) {
    console.error('Failed to fetch vehicles:', error);
  }

  return {
    props: {
      vehicles,
    },
    revalidate: 100,
  };
};
