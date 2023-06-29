import path from "path";
import fs from "fs/promises";

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);
  return data;
}

export async function getStaticProps(context) {
  console.log("RB:: Re-validationg");
  const { params } = context;
  const data = await getData();
  const product = data.products.find((p) => p.id === params.pid);
  if (!product) return { notFound: true };
  return { props: { product }, revalidate: 10 };
}

export async function getStaticPaths() {
  const data = await getData();
  const pathsWithParams = data.products.map((product) => ({
    params: { pid: product.id },
  }));

  return {
    paths: pathsWithParams,
    fallback: true,
  };
}

const ProductDetailsPage = (props) => {
  const { product } = props;

  if (!product) return <p>Loading...</p>;

  return (
    <>
      <h1>{product.title}</h1>
      <p>{product.description}</p>
    </>
  );
};

export default ProductDetailsPage;
