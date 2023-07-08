import { Link } from 'react-router-dom';
import HeroImage from '../../assets/hero.jpg';

function Home() {
  return (
    <div
      className="h-screen flex items-center"
      style={{
        backgroundImage: `linear-gradient(rgba(0,0,0,.4), rgba(0,0,0,.4)), url(${HeroImage})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
      }}
    >
      <section className="w-full bg-cover bg-center py-32">
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl font-medium mb-6">Welcome to BikeRent</h1>
          <p className="text-xl mb-12">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam viverra
            euismod odio, gravida pellentesque urna varius vitae.
          </p>
          <Link
            to="/auth"
            className="bg-indigo-500 text-white py-4 px-12 rounded-full hover:bg-indigo-600"
          >
            Rent a bike
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Home;
