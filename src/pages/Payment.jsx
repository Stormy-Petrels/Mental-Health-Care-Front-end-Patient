import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Payment = () => {
  const informationOfBooking = JSON.parse(localStorage.getItem("informationOfBooking"));
  const user = JSON.parse(localStorage.getItem("user"));
  const baseURL = "http://127.0.0.1:8000/images/";
  const history = useHistory();

  const getBooking = async (event) => {
    event.preventDefault();
    if (informationOfBooking && user) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/appoinment', {
          "patientId": informationOfBooking.patientId,
          "doctorId": informationOfBooking.doctorId,
          "date": informationOfBooking.date,
          "calendarId": informationOfBooking.calendarId,
          "status": "0",
        });
        localStorage.removeItem("informationOfBooking");
        history.push(`/doctor/${informationOfBooking.doctorId}`);
        console.log(response);
      } catch (err) {
        console.error('Error booking time slot:', err);
      }
    }
  }

  const payVnpay = async (event) => {
    event.preventDefault();
    if (informationOfBooking && user) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/payment/vnpayment', {
          "total": informationOfBooking.price * 100,
        });

        const responseStore = await axios.post('http://127.0.0.1:8000/api/store/vnpayment', {
          "patientId": informationOfBooking.patientId,
          "doctorId": informationOfBooking.doctorId,
          "date": informationOfBooking.date,
          "calendarId": informationOfBooking.calendarId,
          "status": "1",
        });

        window.location.href = response.data.data;
        
        console.log(response, responseStore);
        localStorage.removeItem("informationOfBooking");
      } catch (err) {
        console.error('Error booking time slot:', err);
      }
    }
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <div className="text-center mb-6">
        <img src={`${baseURL}${informationOfBooking.doctorImage}`} alt="Doctor" className="mx-auto mb-4 w-[250px] h-[250px] object-cover"/>
        <h1 className="text-2xl font-bold">{informationOfBooking.doctorName}</h1>
        <p>{informationOfBooking.timeStart} - {informationOfBooking.timeEnd} - {informationOfBooking.date}</p>
      </div>

      <div className="border p-4 mb-6">
        <span className="text-lg font-semibold">Price:</span>
        <span className="text-lg font-semibold text-orange-500">{informationOfBooking.price}₫</span>
      </div>

      <form onSubmit={getBooking}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name of patient (required)</label>
          <input type="text" placeholder="Họ và Tên" className="w-full p-2 border rounded" defaultValue={user.fullName} required/>
        </div>

        <div className="mb-4 flex space-x-4">
          <div className="flex items-center">
            <input type="radio" name="gender" id="male" className="mr-2" value="Nam" defaultChecked={user.gender === 'Nam'} />
            <label className="text-gray-700">Nam</label>
          </div>
          <div className="flex items-center">
            <input type="radio" name="gender" id="female" className="mr-2" value="Nữ" defaultChecked={user.gender === 'Nữ'} />
            <label className="text-gray-700">Nữ</label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone Number (required)</label>
          <input type="text" placeholder="Số điện thoại" className="w-full p-2 border rounded" defaultValue={user.phone} required/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email address</label>
          <input type="email" placeholder="Địa chỉ email" className="w-full p-2 border rounded" defaultValue={user.email}/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <input type="text" placeholder="Địa chỉ" className="w-full p-2 border rounded" defaultValue={user.address}/>
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Price:</span>
            <span className="text-lg font-semibold text-orange-500">{informationOfBooking.price}₫</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Price to book:</span>
            <span className="text-lg font-semibold">Free</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Price:</span>
            <span className="text-lg font-semibold text-orange-500">{informationOfBooking.price}₫</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-6">
          <p>Lưu ý: Thông tin bệnh nhân cung cấp sẽ được sử dụng làm hồ sơ khám bệnh, hồ sơ điện tử.</p>
          <p>Quý khách vui lòng kiểm tra lại thông tin trước khi bấm "Xác nhận đặt khám".</p>
        </div>
      <div style={{display: "flex"}}>
        <div className="text-center">
          <button type="submit" className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
            Pay by Cash
          </button>
        </div>

        <div className="text-center">
          <button onClick={payVnpay} className="bg-yellow-500 text-white font-bold py-2 px-4 rounded hover:bg-yellow-600">
            Pay by VNPAY
          </button>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Payment;
