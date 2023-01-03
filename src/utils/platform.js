// // 判断是否是 Mac 电脑
// let isMac = () => {
//   return /macintosh|mac os x/i.test(navigator.userAgent);
// };

// 获取操作系统的位
let getBit = (ua) => {
  if (ua.indexOf("win32") >= 0 || ua.indexOf("wow32") >= 0) return 32;
  else if (ua.indexOf("win64") >= 0 || ua.indexOf("wow64") >= 0) return 64;
  else return null;
};

// 获取操作系统的名称以及类型
let getPlatform = (ua) => {
  let platform, platformType;
  let mobilePlatformOptions = [
    "android",
    "webos",
    "iphone",
    "ipad",
    "ipod",
    "blackberry",
    "iemobile",
    "opera mini",
    "windows ce",
    "windows mobile",
    "ucweb",
  ];
  let reg = new RegExp(mobilePlatformOptions.join("|"), "i");
  if (reg.test(ua)) {
    platformType = "mobile";
    mobilePlatformOptions.forEach((p) => {
      if (ua.indexOf(p) > -1) platform = p;
    });
  } else {
    platformType = "pc";
    let pcPlatformOptions = ["windows"];
    pcPlatformOptions.forEach((p) => {
      if (ua.indexOf(p) > -1) platform = p;
    });
  }
  return { platform, platformType };
};

// 获取操作系统/平台的信息
let getPlatformInfo = () => {
  let ua = navigator.userAgent.toLowerCase();
  let { platform, platformType } = getPlatform(ua);
  let info = {
    platform,
    platformType,
    bit: getBit(ua),
  };
  return info;
};

export default {
  getPlatformInfo,
};
