import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-right",
  showConfirmButton: false,
  timer: 1700,
  timerProgressBar: true,
  width: 500,
});

export function success(message) {
  Toast.fire({ icon: "success", title: message });
}

export function error(message) {
  Toast.fire({ icon: "error", title: message });
}

export function warning(message) {
  Toast.fire({ icon: "warning", title: message });
}
