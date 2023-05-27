import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { Discounts } from '../enums';

function Coupons() {
  const [copiedCoupon, setCopiedCoupon] = useState<string>('');
  const handleCopyCoupon = (code: string) => setCopiedCoupon(code);

  return (
    <ul
      className="d-flex flex-wrap justify-content-around p-3 gap-2 column-gap-3 overflow-y-auto border border-4 rounded bg-warning-subtle"
      style={{ height: '600px' }}
    >
      {Object.entries(Discounts).map(([discount, code]) => (
        <li
          key={discount}
          className="card align-items-center position-relative"
          style={{ width: '350px', height: '300px' }}
        >
          <img
            src="https://ajaxparkingrus.com/wp-content/uploads/2016/10/coupon.jpg"
            className="card-img-top w-100 h-50 p-3"
            alt="coupon"
          />
          <div className="card-body d-flex flex-column align-items-center justify-content-center p-0">
            <h5 className="card-title">
              {discount} {code}
            </h5>
          </div>
          <></>
          <CopyToClipboard text={code}>
            <button
              onClick={() => handleCopyCoupon(code)}
              className="btn btn-secondary btn-lg mb-3 text-capitalize"
              type="submit"
            >
              {copiedCoupon === code ? 'Copied' : 'Copy'}
            </button>
          </CopyToClipboard>
        </li>
      ))}
    </ul>
  );
}

export default Coupons;
