import alertService from '../services/alert.service';
import SERVICES from '../services/common-services';
import API_REQUESTS from './api-requests';
import {URLS} from './api-urls';


const book_slot = (id,payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.slot.book_slot+id+"/slot",
        payload,
      );
      console.log('res::', response?.data);
      
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_payment = (id,payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.booking.update_payment+id+"/payment",
        payload,
      );
      console.log('res::', response?.data);
    
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const complete_booking = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.booking.complete_booking+id+"/complete"
      );
      console.log('res::', response?.data);
      alertService.show("Booking Confirmed","Booking")
      return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_customer_bookings = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.history.get_customer_bookings+id+"/bookings",
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_customer_bookings_history = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.history.get_customer_bookings+id+"/bookings/history",
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_customer_coupons_history = (id) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.history.get_customer_bookings+id+"/coupons",
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_coupons_details = (id,bussinessId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.coupon.get_coupon_details+bussinessId+"/coupons/"+id,
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const rate_booking = (customerId,bookingId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.review.rate_booking+customerId+"/bookings/"+bookingId+"/rate",
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_review_rating = (customerId,reviewId,rating) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.review.rate_booking+customerId+"/reviews/"+reviewId+"/rate/"+rating,
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_review_remarks = (customerId,reviewId,payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.review.rate_booking+customerId+"/reviews/"+reviewId+"/remark",payload
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const upload_review_picture = (customerId,reviewId,payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.review.rate_booking+customerId+"/reviews/"+reviewId+"/picture",payload
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const remove_review_picture = (customerId,reviewId,payload) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.deleteData(
        URLS.review.rate_booking+customerId+"/reviews/"+reviewId+"/picture",payload
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const get_available_booking_coupons = (cid,bid) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.getData(
        URLS.coupon.get_available_coupons+cid+"/bookings/"+bid+"/coupons",
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const avail_coupon = (id,couponId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.postData(
        URLS.coupon.update_coupon+id+"/coupons/"+couponId,
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const update_coupon_payment = (id,couponId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.coupon.update_coupon+id+"/coupons/"+couponId+"/payment",
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const complete_coupon_purchase = (id,couponId) => {
  return async (dispatch, getState) => {
    try {
      const response = await API_REQUESTS.putData(
        URLS.coupon.update_coupon+id+"/coupons/"+couponId+"/complete",
      );
     return response;
    } catch (error) {
      throw new Error(SERVICES._returnError(error));
    }
  };
};
const DIVIY_API = {
  book_slot,
  update_payment,
  get_customer_bookings,
  get_customer_bookings_history,
  get_customer_coupons_history,
  get_coupons_details,
  avail_coupon,
  update_coupon_payment,
  complete_coupon_purchase,
  rate_booking,
  update_review_rating,
  update_review_remarks,
  upload_review_picture,
  remove_review_picture,
  complete_booking,
  get_available_booking_coupons
};

export default DIVIY_API;
