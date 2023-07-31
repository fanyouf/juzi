import html2canvas from 'html2canvas'

const autoPicture = async (el, options) => {
    let { scale = 1, allowTaint = false, useCORS = true, width = '375', height = '649', backgroundColor = null } = options
    const canvas = await html2canvas(el, {
      scale, //缩放比例,默认为1
      allowTaint, //是否允许跨域图像污染画布
      useCORS, //是否尝试使用CORS从服务器加载图像
      width, //画布的宽度
      height, //画布的高度
      // windowHeight: height,
      backgroundColor //画布的背景色，默认为透明
    })
    return canvas.toDataURL('image/png')
  }
   
  export { autoPicture }