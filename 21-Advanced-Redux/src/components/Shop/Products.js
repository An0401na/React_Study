import ProductItem from "./ProductItem";
import classes from "./Products.module.css";

const DUMMY_PRODUCTS = [
  {
    id: 1,
    price: 199.99,
    title: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation.",
  },
  {
    id: 2,
    price: 49.99,
    title: "Bluetooth Speaker",
    description: "Portable speaker with deep bass and 10-hour battery life.",
  },
  {
    id: 3,
    price: 29.99,
    title: "USB-C Hub",
    description: "Multi-port USB-C hub with HDMI and USB 3.0 support.",
  },
  {
    id: 4,
    price: 9.99,
    title: "Phone Stand",
    description: "Adjustable phone stand with non-slip base.",
  },
  {
    id: 5,
    price: 99.99,
    title: "Smartwatch",
    description: "Feature-rich smartwatch with heart rate monitoring.",
  },
];

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product) => (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        ))}
      </ul>
    </section>
  );
};

export default Products;
