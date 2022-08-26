export const IP = 'http://124.29.208.60:8080';
// export const IP='http://192.168.100.3:3000';
export const URLS = {
  //    base_url:'http://192.168.100.3:3000/api/',
  base_url: `${IP}/api/`,
  image_url: `${IP}/`,
  slot: {
    book_slot: 'p/public/bookings/'
  },
  booking:{
    update_payment:'p/public/bookings/',
    complete_booking:'p/public/bookings/'
  },
  history:{
    get_customer_bookings:'c/cus/customers/',
  },
  coupon:{
    get_coupon_details:'p/public/businesses/',
    update_coupon:'c/cus/customers/',
    get_available_coupons:'c/cus/customers/'
  },
  review:{
    rate_booking:'c/cus/customers/'
  }
};
