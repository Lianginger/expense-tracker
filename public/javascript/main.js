
$("#user-image").change(function () {
  checkImageUpload(this);
})

function checkImageUpload(input) {
  if (input.files && input.files[0]) {
    const uploadFileName = input.value
    const uploadFileFormat = uploadFileName.substring(uploadFileName.lastIndexOf('.'))
    const validFileFormat = ['.jpg', '.png', '.jpeg']

    if (validFileFormat.indexOf(uploadFileFormat) < 0) {
      alert('上傳檔案類型錯誤，請上傳 jpg 或 png 檔喲！')
      input.value = null
      $("#user-img-layer").text('請重新上傳！')
      return false
    } else {
      $("#user-img-layer").text('上傳成功！')
    }
  }
}
