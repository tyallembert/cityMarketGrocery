

//=== New Aisle Popup Animation ===
export const animation__newAisleContainer = {
    hidden: { height: 0},
    visible: {
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 20
      }
    }
};
export const animation__newAisleChild = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 20,
            delay: 0.1
        }
    }
};