import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSalesPage = (props) => {
  const [sales, setSales] = useState(props.sales);
  // const [loading, setLoading] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, error } = useSWR(
    "https://nextjs-course-15368-default-rtdb.firebaseio.com/sales.json",
    fetcher
  );

  useEffect(() => {
    if (!data) return;
    const transformedSales = [];

    for (let key in data) {
      transformedSales.push({
        id: key,
        username: data[key].username,
        volume: data[key].volume,
      });
    }
    setSales(transformedSales);
  }, [data]);

  // useEffect(() => {
  //   setLoading(true);
  //   fetch("https://nextjs-course-15368-default-rtdb.firebaseio.com/sales.json")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       const transformedSales = [];

  //       for (let key in data) {
  //         transformedSales.push({
  //           id: key,
  //           username: data[key].username,
  //           volume: data[key].volume,
  //         });
  //       }
  //       setSales(transformedSales);
  //       setLoading(false);
  //     });
  // }, []);

  if (error) return <p>Failed to load!</p>;
  if (!data && !sales && !error) return <p>Loading...</p>;

  return (
    <div>
      {sales ? (
        <ul>
          {sales.map((sale) => (
            <li key={sale.key}>
              {sale.username} - ${sale.volume}
            </li>
          ))}
        </ul>
      ) : (
        <p>No sales data yet!</p>
      )}
    </div>
  );
};

export async function getStaticProps() {
  return fetch(
    "https://nextjs-course-15368-default-rtdb.firebaseio.com/sales.json"
  )
    .then((res) => res.json())
    .then((data) => {
      const transformedSales = [];
      for (let key in data) {
        transformedSales.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }

      return { props: { sales: transformedSales } };
    });
}

export default LastSalesPage;
