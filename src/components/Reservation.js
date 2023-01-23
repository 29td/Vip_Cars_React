import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import {
  Navigation,
  Pagination, A11y,
} from 'swiper';
import { getAllReservations, allReservations } from '../redux/reservations/reservationSlice';
// import { allCars } from '../redux/cars/carSlice';
import Navbar from './Navbar';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainPage = () => {
  const reservations = useSelector(allReservations);
  // const cars = useSelector(allCars);
  // console.log(cars);
  // console.log('Res: ', reservations);

  const dispatch = useDispatch();
  const swiperRef = useRef();

  useEffect(() => { dispatch(getAllReservations()); }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
      <main className="main main-page">
        <h1 className="title">MY RESERVATIONS</h1>
        <p className="sub-title">Please select a Reservation to see details</p>

        <section className="cars-container">
          <Swiper
            modules={[Navigation, Pagination, A11y]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            onBeforeInit={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              // when window width is >= 640px
              0: {
                slidesPerView: 1,
              },
              // when window width is >= 768px
              768: {
                spaceBetween: 15,
                slidesPerView: 2,
              },
              // when window width is >= 768px
              900: {
                spaceBetween: 20,
                slidesPerView: 3,
              },
            }}
            className="mySwiper"
          >
            { reservations.map((res) => (
              <SwiperSlide key={res.id}>
                <a href={`/cars/${res.id}`} className="car">
                  {res.id}
                  <div className="car-img-wrap">
                    {/* { cars.forEach((car) => { */}
                    {/*  let image; */}
                    {/*  if (car.id === res.car_id) { */}
                    {/*    image = <img className="car-img" src={car.image} alt={car.name} /> */}
                    {/*  } */}
                    {/*  return ''; */}
                    {/* })} */}
                  </div>
                  <table>
                    <tr>
                      <th>City</th>
                      <tr>{res.city}</tr>
                    </tr>
                    <tr>
                      <th>Reserved</th>
                      <tr>{res.reservation_date.slice(0, 10)}</tr>
                    </tr>
                    <tr>
                      <th>Returning</th>
                      <tr>{res.returning_date.slice(0, 10)}</tr>
                    </tr>
                  </table>
                </a>
              </SwiperSlide>
            ))}
          </Swiper>
          <button type="button" aria-label="previous" className="btn prev" onClick={() => swiperRef.current?.slidePrev()} />
          <button type="button" aria-label="previous" className="btn next" onClick={() => swiperRef.current?.slideNext()} />
        </section>

      </main>
    </div>
  );
};

export default MainPage;
