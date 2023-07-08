import BikeList from '../../components/BikeList/indext';
import Navbar from '../../components/Navbar';

function Dashboard() {
  return (
    <>
      <Navbar />
      <div className="2xl:container 2xl:mx-auto sm:px-7 px-4 pt-32">
        <h1 className="text-3xl font-semibold text-gray-800 text-center pb-10">
          Bikes to rent
        </h1>
        <BikeList />
      </div>
    </>
  );
}

export default Dashboard;
