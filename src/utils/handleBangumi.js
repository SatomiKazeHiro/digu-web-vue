/**
 * 处理返回的文件，生成对应标签和链接
 */

// 浏览器支持的视频格式
let supportedVideoFormats = ["mp4", "webm", "ogg"];

/**
 * 获取文件名
 * @param {String}} fileName 文件名
 * @returns 没有后缀名的字符串
 */
let removeSuffix = function (fileName) {
  return fileName
    .split(".")
    .slice(0, fileName.split(".").length - 1)
    .join(".");
}

// 生成标签、链接
let handleBangumi = function (mediaInfo) {
  // 遍历出受支持的视频文件
  let supportedVideos = mediaInfo.files.filter((f) => {
    return supportedVideoFormats.indexOf(f.split(".").pop().toLowerCase()) > -1;
  });

  return supportedVideos.map((v,index) => {
    return {
      value: index,
      label: removeSuffix(v),
      source_url: `${mediaInfo.sources_url}${v}`,
      link_url: `${mediaInfo.link_url}/s/${index + 1}`
    }
  })

  // ----------------------------------------------------

  // 用来存储文件名中没有数字的视频文件
  let otherVideos = [];

  // 依据每个文件名进行简单的封装数据
  let videos = supportedVideos.map((v) => {
    // 获取文件名（去除后缀名）
    let fileName = removeSuffix(v);
    // 正则表达式提取视频文件名称的第一个整数或小数
    let reRes = fileName.match(/(\d+\.\d+|\d+)/g) || [];
    // 名称符合的情况下封装数据
    if (reRes[0]) {
      reRes[0] = Number(reRes[0]);
      return {
        value: reRes[0],
        label: `第${reRes[0]}话`,
        source_url: `${mediaInfo.sources_url}${v}`,
      };
    } else otherVideos.push(v);
  });

  // 过滤 undefined
  videos = videos.filter((v) => v !== undefined);
  // 排序文件名有数字的视频
  videos.sort((a, b) => a.value - b.value);
  // 重新赋予序号
  videos.forEach((v, index) => {
    v.link_url = `${mediaInfo.link_url}/s/${index + 1}`;
    v.value = index + 1;
  });

  // 置入没有数字的文件
  otherVideos.forEach((v) => {
    videos.push({
      value: videos.length + 1,
      label: removeSuffix(v),
      source_url: `${mediaInfo.sources_url}${v}`,
      link_url: `${mediaInfo.link_url}/s/${videos.length + 1}`,
    });
  });

  return videos;
}

export default handleBangumi;
