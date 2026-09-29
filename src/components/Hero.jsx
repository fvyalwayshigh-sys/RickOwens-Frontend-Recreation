import { Link } from 'react-router-dom';
import NavBar from './NavBar';
import Collection from './Collection';
import Footer from './Footer';

const VideoLoop1 = () => {
  return (
    <div className="video-container h-full w-full">
      <video
        src="//www.rickowens.eu/cdn/shop/videos/c/vp/f2f829b4b64d4dc99be5347ce4d2b055/f2f829b4b64d4dc99be5347ce4d2b055.HD-1080p-7.2Mbps-95041940.mp4?v=0"
        autoPlay
        loop
        muted
        playsInline
        controls={false}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

const Hero = () => {
  return (
    <>
      <NavBar />
      <Link
        to="/homepage"
        aria-label="View homepage runway pieces"
        className="hero group block h-screen w-screen relative overflow-hidden cursor-pointer"
        data-nav-theme="light">
        <div className="video absolute inset-0 w-full h-full z-0">
          <VideoLoop1 />
        </div>
        <div className="absolute inset-0 z-10 bg-transparent transition-colors duration-500 group-hover:bg-black/70 " />
        <div className="group-hover:absolute transition-all duration-75 inset-0 z-20 flex items-center justify-center pointer-events-none ">
          <h1 className="text-white text-xs">LAST WEEK OF SALE</h1>
        </div>
      </Link>
      <Collection />
      <Footer />
    </>
  );
};

export default Hero;
