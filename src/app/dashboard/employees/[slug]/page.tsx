export default function Employee({ params }: { params: { slug: string } }) {
  const { slug } = params;
  return <div>Employee N{slug}</div>;
}
