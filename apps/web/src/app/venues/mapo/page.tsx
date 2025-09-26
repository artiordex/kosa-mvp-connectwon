import CenterDetail from './CenterDetail';

export async function generateStaticParams() {
  return [
    { center: 'mapo' }
  ];
}

export default function MapoCenterPage() {
  return <CenterDetail />;
}