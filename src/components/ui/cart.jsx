import { FaCartShopping } from "react-icons/fa6";
import Modal from "./modal/Modal";
import ShoppingCartModal from "./ShoppingCart";
import { useSelector } from 'react-redux';
import Notification from "./Notification";

const Cart = ({ isCartOpen, setCartOpen, showLoginMessage, setShowLoginMessage }) => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const handleCartClick = () => {
    if (isAuthenticated) {
      setCartOpen(true);
    } else {
      setShowLoginMessage(true);
    }
  };

  return (
    <>
      <a
        href="#"
        className="hover:text-ivory"
        onClick={handleCartClick}
      >
        <FaCartShopping />
        cart
      </a>

      {showLoginMessage && <Notification title="Please log in to access your cart" />}

      <Modal isOpen={isCartOpen} onClose={() => setCartOpen(false)}>
        <ShoppingCartModal />
      </Modal>
    </>
  );
};

export default Cart;
