import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { formatDate } from 'date-fns';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Payment = () => {
  const informationOfBooking = JSON.parse(localStorage.getItem("informationOfBooking"));
  const user = JSON.parse(localStorage.getItem("user"));
  const baseURL = "http://127.0.0.1:8000/images/";
  const history = useHistory();
  
  let convert = parseFloat(informationOfBooking.price);
  let coverPrice = convert.toLocaleString('vi-VN');
  console.log(coverPrice);
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
        toast.success("Booking successful!", { autoClose: 1500 });
        history.push(`/doctor/${informationOfBooking.doctorId}`)
        console.log(response);
      } catch (err) {
        console.error('Error booking time slot:', err);
        toast.error("Failed to book appointment, please try again.", { autoClose: 1500 });
      }
    }
  }
  const formattedDate = formatDate(new Date(informationOfBooking.date), "EEEE, MMMM dd, yyyy");

  const payVnpay = async (event) => {
    event.preventDefault();
    if (informationOfBooking && user) {
      try {
        const response = await axios.post('http://127.0.0.1:8000/api/payment/vnpayment', {
          "total": informationOfBooking.price / 10,
        });
        window.location.href = response.data.data;
        console.log(response);
      } catch (err) {
        console.error('Error booking time slot:', err);
      }
    }
  }

  return (
    <div className="pt-10 pb-20 ">
       <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <div className="text-center mb-6">
        <img src={`${baseURL}${informationOfBooking.doctorImage}`} alt="Doctor" className="mx-auto mb-4 w-[220px] h-[220px] rounded-xl object-cover"/>
        <h1 className="text-2xl font-bold">{informationOfBooking.doctorName}</h1>
        <p className='text-xl'>{informationOfBooking.timeStart} - {informationOfBooking.timeEnd} - {formattedDate}</p>
      </div>

      <div className="border p-4 mb-6">
        <span className="text-lg font-semibold">Price:</span>
        <span className="text-lg font-semibold text-orange-500">{coverPrice} VND</span>
      </div>

      <form onSubmit={getBooking}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Name of patient (required)</label>
          <input type="text" placeholder="Họ và Tên" className="w-full p-2 border rounded" defaultValue={user.fullName} disabled/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Phone Number (required)</label>
          <input type="text" placeholder="Số điện thoại" className="w-full p-2 border rounded" defaultValue={user.phone} disabled/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Email address</label>
          <input type="email" placeholder="Địa chỉ email" className="w-full p-2 border rounded" defaultValue={user.email} disabled/>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Address</label>
          <input type="text" placeholder="Địa chỉ" className="w-full p-2 border rounded" defaultValue={user.address} disabled/>
        </div>

        <div className="border-t pt-4 mb-6">
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Price:</span>
            <span className="text-lg font-semibold text-orange-500">{coverPrice} VND</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="text-lg font-semibold">Price to book:</span>
            <span className="text-lg font-semibold">Free</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-lg font-semibold">Total Price:</span>
            <span className="text-lg font-semibold text-orange-500">{coverPrice} VND</span>
          </div>
        </div>

        <div className="text-center text-sm text-gray-500 mb-6">
          <p>Note: Information provided by patients will be used as medical records and electronic records.</p>
          <p style={{color: "red"}}>* if you want change something please change your information on your profile.</p>
          <p style={{color: "red"}}>Please check the information again before clicking "Confirm booking".</p>
        </div>
        <div style={{display: "flex", gap: "2px", width: "100%"}}>
          <div style={{width: "50%", textAlign: "center"}}>
              <button 
                  onClick={payVnpay} 
                  style={{
                      backgroundColor: "#FF5A00",
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      width: "100%",
                      transition: "background-color 0.3s",
                      border: "1px solid",
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#FF5A00"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#FDA321"}
              >
                  Pay by VNPAY
              </button>
          </div>
          <div style={{width: "50%", textAlign: "end"}}>
              <button 
                  onClick={() => history.push('/doctors')} 
                  style={{
                      backgroundColor: "#8C8C8C",
                      color: "white",
                      fontWeight: "bold",
                      padding: "10px 20px",
                      borderRadius: "5px",
                      width: "100%",
                      transition: "background-color 0.3s",
                      
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = "#8C8C8C"}
                  onMouseLeave={(e) => e.target.style.backgroundColor = "#8C8C8C"}
              >
                  Cancel
              </button>
          </div>
        </div>
      </form>
    </div>
    </div>  
  );
};

export default Payment;
