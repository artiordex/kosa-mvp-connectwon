import CenterDetail from './VenueDetail';

export async function generateStaticParams() {
  return [
    { center: 'gangnam' }
  ];
}

export default function GangnamCenterPage() {
  return <CenterDetail />;
}
