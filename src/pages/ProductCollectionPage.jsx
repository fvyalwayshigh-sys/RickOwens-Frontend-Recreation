import { useState } from 'react';
import FilterSort from '../components/FilterSort';
import Footer from '../components/Footer';
import NavBar from '../components/NavBar';
import ProductCard from '../components/ProductCard';
import { getProductsByCollection } from '../data/product';

const ProductCollectionPage = ({ collection }) => {
  const products = getProductsByCollection(collection);
  const [visibleCount, setVisibleCount] = useState(6);
  const visibleProducts = products.slice(0, visibleCount);
  const handleLoadMore = () => setVisibleCount(count => Math.min(count + 6, products.length));

  return (
    <div className="min-h-screen w-full relative flex flex-col justify-between" data-nav-theme="light">
      <NavBar />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 gap-y-80 p-10 pt-28 pb-32">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <FilterSort
        totalCount={products.length}
        visibleCount={visibleProducts.length}
        onLoadMore={handleLoadMore}
        hasMore={visibleCount < products.length}
      />
      <Footer />
    </div>
  );
};

export default ProductCollectionPage;
