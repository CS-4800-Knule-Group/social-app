import { useState } from 'react';
import { createPortal } from 'react-dom';
import LoginForm from './LoginForm';

export default function LoginModal() {
    const [showModal, setShowModal] = useState(false);
    return (
      <>
        <button onClick={() => setShowModal(true)}>
          Show modal using a portal
        </button>
        {showModal && createPortal(
          <LoginForm onClose={() => setShowModal(false)} />,
          document.body
        )}
      </>
    );
  }
