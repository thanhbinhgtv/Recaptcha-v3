import React, { useCallback, useEffect, useState } from 'react'
import { GoogleReCaptchaProvider, useGoogleReCaptcha, withGoogleReCaptcha } from 'react-google-recaptcha-v3'
import { useNavigate, useSearchParams } from "react-router-dom";
import { useApi } from './api/api';
const reCaptchaKey = process.env.REACT_APP_RECAPTCHA_KEY;

const MyCaptcha = ({ googleReCaptchaProps, handleLoading }) => {
  const [searchParams] = useSearchParams();
  const phone = searchParams.get('phone')

  const { executeRecaptcha } = useGoogleReCaptcha();
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  const getToken = useCallback(async () => {
    handleLoading(true);
    await executeRecaptcha().then((resolve) => {
      useApi.postVerify({ phone: phone, recaptcha_token: resolve }).then((res) => {
        if (res.data.status === 0) {
          navigate('/failure');
          handleLoading(false)
        } else {
          setToken(resolve);
          navigate(`/success`);
          handleLoading(false)
        }
      }).catch((reject) => {
        handleLoading(false)
        navigate('/failure');
      });
    }).catch((reject) => {
      navigate('/failure');
      handleLoading(false)
    });
  }, [googleReCaptchaProps]);

  useEffect(() => {
    getToken();
  }, [getToken]);

  return (
    <div>{token}</div>
  );
};

const MyCaptchaa = withGoogleReCaptcha(MyCaptcha);

const RecaptchaV3 = ({ handleLoading }) => {
  console.log('reCaptchaKey :>> ', reCaptchaKey);
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={reCaptchaKey}
    >
      <MyCaptchaa handleLoading={handleLoading} />
    </GoogleReCaptchaProvider>
  )
}


export default RecaptchaV3