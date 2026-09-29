import { Link } from 'react-router-dom';
import { featuredCollections } from '../data/product';

const Collection = () => (
  <div className="grid grid-cols-1 w-screen overflow-x-hidden sm:grid-cols-2">
    {featuredCollections.map(collection => (
      <Link key={collection.path} to={collection.path}>
        <div className="group relative h-screen overflow-hidden cursor-pointer" data-nav-theme="dark">
          <div className="relative z-0 h-full w-full">
            <video
              src={collection.video}
              autoPlay
              loop
              muted
              playsInline
              controls={false}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute inset-0 z-10 bg-transparent transition-colors duration-500 group-hover:bg-black/70 pointer-events-none" />
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
            <h1 className="text-gray-300 text-xs tracking-widest">{collection.title}</h1>
          </div>
        </div>
      </Link>
    ))}
  </div>
);

export default Collection;
