/**
 * Created by Administrator on 2017/4/3.
 */
$(function(){
  $('td a:odd').click(function(e){
	e.preventDefault();
	var flag = confirm('确认要删除该条记录吗？');
	if(flag){
	  location.href = $(this).attr('href');
	}
  });
});