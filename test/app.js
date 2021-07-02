/*
 * @Author: ikouane
 * @Date: 2021-07-02 10:52:14
 * @LastEditTime: 2021-07-02 13:58:05
 * @LastEditors: ikouane
 * @Description:
 * @version:
 */
var Qqwry = require("../");
var path = require("path");
var dp = path.join(__dirname, "../data/qqwry.dat");
var qqwry = Qqwry(); // Qqwry.init() <=> Qqwry()

var fs = require("fs");

let ip_origin = [];
let ip_result = [];
let ip_str = "";

fs.readFile(
  path.join(__dirname, "../data/ip.txt"),
  "utf-8",
  function (err, data) {
    if (err) {
      console.error(err);
    } else {
      ip_str = data;
      // console.log(data);

      ip_origin = ip_str.split(/[(\r\n)\r\n]+/);
      ip_origin.forEach((item, index) => {
        if (!item) {
          ip_origin.splice(index, 1); //删除空项
        }
      });

      // console.log("arr:", ip_origin);

      ip_origin.forEach((item) => {
        let ip = qqwry(item);
        console.log(
          `${((ip_result.length / ip_origin.length) * 100).toFixed(2)}%`,
          `${ip.ip}:${ip.Country}(${ip.Area})`
        );
        ip_result.push(`${ip.Country}(${ip.Area})`);
      });

      console.log(
        `${((ip_result.length / ip_origin.length) * 100).toFixed(2)}%`
      );

      // console.log(ip_result);

      fs.writeFile(
        path.join(__dirname, "../data/result.txt"),
        ip_result.join("\n"),
        (err, data) => {
          if (err) throw err;
        }
      );

      if (ip_origin.length == ip_result.length) {
        console.log(
          `处理完成：原始数据 ${ip_origin.length} 条，处理 ${ip_result.length} 条`
        );
      } else
        console.log(
          `处理完成：原始数据 ${ip_origin.length} 条，处理成功 ${
            ip_result.length
          } 条，处理失败 ${ip_origin.length - ip_result.length} `
        );
    }
  }
);

// return;
