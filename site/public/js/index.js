$(function(){
	
var letter=[];
var table=[];  	
	//把线性数组转换成对象
function format(arr){	
var r={};
arr.forEach(function(v,i){
	var key=v.pinyin.charAt(0).toUpperCase();
	if(r[key]){
		r[key].push(v);
	}else{
		r[key]=[];
  		r[key].push(v)
	}	
}
);
return r;
 }
  
	//根据数据渲染页面
function reader(data){	
	$('#contact,.c-index').empty();
	 var o=format(data);
	  letter=Object.keys(o).sort();
	 $('.c-index').height(30*letter.length);
	 letter.forEach(function(v,i){
	 	$('<div>').text(v).appendTo(".c-index");
	 	$('<dt>').text(v).appendTo("#contact");
	 	o[v].forEach(function(v,i){
	 		$('<dd><a href="tel:'+v.phone+'">'+v.name+'</a></dd>').text(v.name).appendTo("#contact");
	 	} 	)
	 })
	
	$('dt').prev().css('border','none') 
	$('#tip').text(letter[0]);
	table=[];
	$('dt').each(function(i,v){
       table.push($(this).offset().top-78)
		
	})
	console.log(table)
	
};
//所有联系
var contacts=[];
   $.ajax({
   	url:'/user',
   	type:'get',
   	success:function(r){
   		contacts=r;
   		reader(contacts);	
   	}
   });  
//根据搜索关键过滤数组
   $('.search').on('keyup',function(){
   	var val=$.trim($(this).val());
   	var tmp=[];
   	 contacts.forEach(function(v,i){
   	 	if(v.phone.indexOf(val)!==-1||
   	 	v.name.indexOf(val)!==-1||
   	 	v.pinyin.indexOf(val)!==-1){
   	 		tmp.push(v);
   	 	}
   	 })
   	
   	 reader(tmp);	
   });



   
//页面滚轮事件
$(document).on('scroll',function (){	
	var index;
	var top=$(document).scrollTop();	
	table.forEach(function(v,i){
		if(top>v){
		index=i;
	    }		
	    });
	$('#tip').text(letter[index]);	
})

//处理字母点击事件
$(".c-index").on('click','div',function(){
	var index=$(this).index();
	    $(window).scrollTop(table[index]+30);
});




})
