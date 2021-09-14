var user = document.querySelector('.user>div');
  var userUl = document.querySelector('.user>ul');
  var flag = false
  user.addEventListener('click', () => {
    if (!flag) {
      userUl.style.display = 'block';
      flag = !flag;
    } else {
      userUl.style.display = 'none';
      flag = !flag;

    }

  });
  //模态框取消
  var back = document.querySelector('.back');
  var box = document.querySelector('.box');
  var del = document.querySelectorAll('#delete');
  var inputId = box.querySelector('input');
  back.addEventListener('click', () => {
    box.style.display = 'none';
  });
  //删除点击事件
  for(var i = 0; i<del.length;i++){
    del[i].addEventListener('click', function () {
    //将模态框显示
    var id = this.getAttribute('data-id');
    console.log(id);
    inputId.value = id;
    box.style.display = 'block';

  });
  }