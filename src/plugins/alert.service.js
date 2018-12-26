import iziToast from 'izitoast'

export default {
  info (data) {
    if (typeof data === 'string')
      iziToast.info({ message: data });
    else
      iziToast.info(data)
  },

  success(message) {
    iziToast.success({
      message,
    })
  },

  error(message) {
    iziToast.error({
      message,
    })
  },

  warning(message) {
    iziToast.warning({
      message,
    })
  }
}
