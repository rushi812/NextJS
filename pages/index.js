import path from "path";
import fs from "fs/promises";
import Link from "next/link";

export async function getStaticProps() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return { props: { products: data.products } };
}

function HomePage(props) {
  const { products } = props;
  return (
    <ul>
      {products.map(({ id, title }) => (
        <li key={id}>
          <Link href={`/products/${id}`}>{title}</Link>
        </li>
      ))}
    </ul>
  );
}

export default HomePage;
