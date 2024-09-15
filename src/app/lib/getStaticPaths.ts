import { GetStaticPaths } from 'next';
import { VehicleMake } from '../types/VehicleMake';

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/vehicles/GetMakesForVehicleType/car?format=json`);
  if (!res.ok) {
    throw new Error('Failed to fetch makes');
  }

  const data = await res.json();
  const makes: VehicleMake[] = data.Results.map((item: any) => ({
    MakeId: item.MakeId,
    MakeName: item.MakeName
  }));

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: currentYear - 2015 + 1 }, (_, i) => 2015 + i);

  const paths = makes.flatMap((make) =>
    years.map((year) => ({
      params: { makeId: make.MakeId.toString(), year: year.toString() },
    }))
  );

  return {
    paths,
    fallback: 'blocking',
  };
};