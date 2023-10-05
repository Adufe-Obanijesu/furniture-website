import { toast } from "react-toastify";

const successNotification = (message) => {
  toast.success(message, { position: toast.POSITION.TOP_CENTER });
};

const errorNotification = (message) => {
  toast.error(message, { position: toast.POSITION.TOP_CENTER });
};

export { successNotification, errorNotification };