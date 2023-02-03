

//=== New Aisle Popup Animation ===
export const animation__newAisleContainer = {
    hidden: { height: 0 },
    visible: {
      height: "auto",
      transition: {
        type: "spring",
        stiffness: 200,
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

//=== New Task Popup Animation ===
export const animation__newTaskContainer = {
  hidden: { "max-height": 0 },
  visible: {
    "max-height": "300px",
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20
    }
  }
};