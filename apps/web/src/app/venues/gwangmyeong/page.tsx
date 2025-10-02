import CenterDetail from './CenterDetail';

export async function generateStaticParams() {
  return [
    { center: 'gwangmyeong' }
  ];
}

export default function GwangmyeongCenterPage() {
  return <CenterDetail />;
}
