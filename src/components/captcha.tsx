import { createPortal } from 'react-dom';
import ReCAPTCHA from 'react-google-recaptcha';

import { CAPTCHA_KEY } from '../constants';

type CaptchaProps = {
  hideCaptcha: () => void;
  setCaptchaStatus: (status: boolean) => void;
};

function Captcha({ hideCaptcha, setCaptchaStatus }: CaptchaProps): JSX.Element {
  const approveCaptcha = () => setCaptchaStatus(true);
  return createPortal(
    <div
      onClick={hideCaptcha}
      className="position-absolute top-0 start-0 w-100 h-100 bg-black bg-opacity-50"
    >
      <ReCAPTCHA
        className="position-absolute top-50 start-50 translate-middle"
        sitekey={CAPTCHA_KEY}
        onChange={approveCaptcha}
      />
    </div>,
    document.body
  );
}

export default Captcha;
