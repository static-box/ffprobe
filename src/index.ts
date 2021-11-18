import * as os from "os";
const arch = os.arch();
const platform = os.platform();

import { osx64 } from "@static-box/ffprobe-osx";
import { win32, win64 } from "@static-box/ffprobe-win";
import { linux32, linux64 } from "@static-box/ffprobe-linux";
import { arm64, armhf32, armel32 } from "@static-box/ffprobe-linux-arm";

export const ffprobeMap = {
  osx64,
  win64,
  win32,
  linux64,
  linux32,
  armel32,
  armhf32,
  arm64,
};

const getStaticPath = () => {
  if (platform === "darwin") {
    return ffprobeMap.osx64.path;
  } else if (platform === "linux") {
    if (arch === "arm" || arch === "arm64") {
      return ffprobeMap.arm64.path;
    } else {
      return ffprobeMap.linux64.path;
    }
  } else if (platform === "win32") {
    if (arch === "x32") {
      return ffprobeMap.win32.path;
    } else {
      return ffprobeMap.win64.path;
    }
  } else {
    return "";
  }
};

export const ffprobe = getStaticPath();
