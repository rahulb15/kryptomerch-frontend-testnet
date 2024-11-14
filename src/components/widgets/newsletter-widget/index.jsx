// import PropTypes from "prop-types";

// const NewsletterWidget = ({ data }) => (
//     <div className="widget-bottom mt--40 pt--40">
//         <h6 className="title">{data.title}</h6>
//         <div className="input-group">
//             <input
//                 type="text"
//                 className="form-control bg-color--2"
//                 placeholder="Your username"
//                 aria-label="Recipient's username"
//             />
//             <div className="input-group-append">
//                 <button
//                     className="btn btn-primary-alta btn-outline-secondary"
//                     type="button"
//                 >
//                     Subscribe
//                 </button>
//             </div>
//         </div>
//         {data?.note && (
//             <div className="newsletter-dsc">
//                 <p>{data.note}</p>
//             </div>
//         )}
//     </div>
// );

// NewsletterWidget.propTypes = {
//     data: PropTypes.shape({
//         title: PropTypes.string,
//         note: PropTypes.string,
//     }),
// };
// export default NewsletterWidget;


// components/NewsletterWidget.jsx
import { useState } from 'react';
import PropTypes from 'prop-types';
import newsletterService from 'src/services/newsletter.service';

const NewsletterWidget = ({ data }) => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState({
    type: '', // 'success' | 'error' | ''
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email);
  };

  const handleSubscribe = async () => {
    if (!email) {
      setStatus({
        type: 'error',
        message: 'Please enter your email address'
      });
      return;
    }

    if (!validateEmail(email)) {
      setStatus({
        type: 'error',
        message: 'Please enter a valid email address'
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await newsletterService.subscribe(email);
      setStatus({
        type: 'success',
        message: 'Successfully subscribed to newsletter!'
      });
      setEmail('');
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message || 'Subscription failed. Please try again.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="widget-bottom mt--40 pt--40">
      <h6 className="title">{data.title}</h6>
      <div className="input-group">
        <input
          type="email"
          className={`form-control bg-color--2 ${
            status.type === 'error' ? 'border-danger' : ''
          }`}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setStatus({ type: '', message: '' });
          }}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleSubscribe();
            }
          }}
        />
        <div className="input-group-append">
          <button
            className={`btn ${
              isLoading ? 'btn-secondary' : 'btn-primary-alta'
            } btn-outline-secondary`}
            type="button"
            onClick={handleSubscribe}
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true" />
            ) : (
              'Subscribe'
            )}
          </button>
        </div>
      </div>
      
      {status.message && (
        <div className={`newsletter-status mt-2 ${status.type === 'error' ? 'text-danger' : 'text-success'}`}>
          <p className="small m-0">{status.message}</p>
        </div>
      )}
      
      {data?.note && (
        <div className="newsletter-dsc">
          <p>{data.note}</p>
        </div>
      )}
    </div>
  );
};

NewsletterWidget.propTypes = {
  data: PropTypes.shape({
    title: PropTypes.string.isRequired,
    note: PropTypes.string,
  }).isRequired,
};

export default NewsletterWidget;
