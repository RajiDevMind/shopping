import axios from "axios";

const BACKEND_URL = "http://localhost:2000";
const API_URL = `${BACKEND_URL}/auth/coupon/`;

// Create Coupon
const createCoupon = async (couponData) => {
  const resp = await axios.post(API_URL + "createCoupon", couponData);
  return resp.data;
};

const getAllCoupons = async () => {
  const resp = await axios.get(API_URL + "getAllCoupons");
  return resp.data;
};

const couponService = {
  createCoupon,
  getAllCoupons,
};

export default couponService;
