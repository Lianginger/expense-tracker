
$("#user-image").change(function () {
  checkImageUpload(this);
})

function checkImageUpload(input) {
  if (input.files && input.files[0]) {
    $("#user-img-layer").text('上傳成功！')
  }
}
