$("#user-image").change(function () {
  checkImageUpload(this)
})

function checkImageUpload(input) {
  if (input.files && input.files[0]) {
    const uploadFileName = input.value
    const uploadFileFormat = uploadFileName.substring(uploadFileName.lastIndexOf('.'))
    const validFileFormat = ['.jpg', '.png', '.jpeg']

    if (validFileFormat.indexOf(uploadFileFormat) < 0) {
      alert('檔案類型錯誤，請選擇 jpg 或 png 檔喲！')
      input.value = null
      $("#user-img-upload-text").text('請重新選擇！')
      return false
    } else {
      $("#user-img-upload-text").html('太美了！<br>快按下確定')
    }
  }
}

$("#profile-edit-summit-button").click(function () {
  $("#user-img-upload-text").html(`
    <p>上傳中</p>
    <div class="spinner-border spinner-border-sm" role="status">
      <span class="sr-only">Loading...</span>
    </div>
  `)
})

