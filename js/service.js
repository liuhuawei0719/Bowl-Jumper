//加上一层半透明的黑幕，显示中间白色区域，模仿模态框
function offLight()
{
	document.getElementById('light').style.display='table';
	document.getElementById('fade').style.display='block';
}
//恢复原来的网页状态
function onLight()
{
	document.getElementById('light').style.display='none';
	document.getElementById('fade').style.display='none';
}

//将图片转换为base64编码
function convertImgToBase64(url, callback, outputFormat)
{ 
	var canvas = document.createElement('CANVAS'); 
	var ctx = canvas.getContext('2d'); 
	var img = new Image; 
	img.crossOrigin = 'Anonymous'; 
	img.onload = function()
	{ 
		canvas.height = img.height; 
		canvas.width = img.width; 
		ctx.drawImage(img,0,0); 
		var dataURL = canvas.toDataURL(outputFormat || 'image/png');
		callback.call(this, dataURL); 
		// Clean up 
		canvas = null; 
	}; 
	img.src=url;
} 