
$("#user-image").change(function () {
  checkImageUpload(this);
})

function checkImageUpload(input) {
  if (input.files && input.files[0]) {
    const uploadFileName = input.value
    const uploadFileFormat = uploadFileName.substring(uploadFileName.lastIndexOf('.'))
    const validFileFormat = ['.jpg', '.png', '.jpeg']

    if (validFileFormat.indexOf(uploadFileFormat) < 0) {
      alert('檔案類型錯誤，請選擇 jpg 或 png 檔喲！')
      input.value = null
      $("#user-img-layer").text('請重新選擇！')
      return false
    } else {
      $("#user-img-layer").html('看起來棒極了！<br>快按下【確定】按鈕')
    }
  }
}
