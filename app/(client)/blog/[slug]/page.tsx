import Container from "@/components/Container";
import Title from "@/components/Title";

export default async function page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  return (
    <div>
      <Container>
        <Title>
          Single Blog page: <p>{slug && slug}</p>
        </Title>
      </Container>
    </div>
  );
}
