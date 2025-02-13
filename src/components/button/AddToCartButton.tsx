import React from "react";
import styles from "./AddToCartButton.module.css";

interface AddToCartButtonProps {
  onClick: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ onClick }) => {
  return (
    <button className={styles.button} onClick={onClick}>
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
