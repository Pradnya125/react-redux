import ProductItem from './ProductItem';
import classes from './Products.module.css';

const DUMMY_PRODUCTS=[
  {
    id:'p1',
    price:20,
    title:'Shoe Dog',
    description:'Shoe Dog by Phill - story of Nike'
  },
  {
    id:'p2',
    price:25,
    title:'Psycology of Money',
    description:'understand Money'

  }
]

const Products = (props) => {
  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {DUMMY_PRODUCTS.map((product)=>(
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
