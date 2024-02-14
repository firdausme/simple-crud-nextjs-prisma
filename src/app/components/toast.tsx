import Swal from "sweetalert2";

const toast = async (message: string) => {
    await Swal.fire({
        text: message,
        toast: true,
        icon: 'success',
        position: 'top-right',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
    })
}

export default toast;