const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");


async function execFun(cmdStr){
  const { stdout, stderr } = await exec(cmdStr);
  console.log("stderr:", stderr);
  return {out: stdout, err: stderr};
}

function getTagStr() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() > 10 ? now.getMonth() + 1 : '0' + (now.getMonth() + 1);
  let date = now.getDate() > 10 ? now.getDate() : '0' + now.getDate();
  let hour = now.getHours() > 10 ? now.getHours() : '0' + now.getHours();
  let minute = now.getMinutes() > 10 ? now.getMinutes(): '0' + now.getMinutes();
  let seconde = now.getSeconds() > 10 ? now.getSeconds() : '0' + now.getSeconds();
  return 'dev' + year + month + date + hour + minute + seconde; 
}
function updateConfigFile() {
  // fs.readFile(__dirname+"/cmd_spawn.js", "utf-8", function(error, data) {
  //   if (error) return console.log("读取文件失败,内容是" + error.message);
  //   console.log("读取文件成功,内容是" + data);
  //   return data;
  // });
  let devStr = "";
  try {
    devStr = fs.readFileSync(path.resolve(__dirname, '../../src/configuration/dev.js'), 'utf-8');
  } catch (err) {
    console.log('文件缺失不用怕，只有打包的时候才会用到', err)
  }
  console.log("devStr:", devStr);
}
async function init() {
  let {out: userName} = await execFun('git config user.name');
  let {out: curBranch} = await execFun("git symbolic-ref --short -q HEAD");
  // 去掉尾部 回车
  userName = userName.replace(/[ ]|[\r\n]/g,"");
  console.log("userName:", userName, 'hi');
  console.log("curBranch:", curBranch);
  let tag = getTagStr();
  console.log("tag:", tag);
  updateConfigFile();
  await execFun(`git add .`);
  try{
    await execFun(`git commit -m "new tag ${tag} published by ${userName}" --no-verify`);
  } catch (err) {
    console.log("无需提交的内容");
  }
  try{
    let et = await execFun('git push');
  } catch(err) {
    console.log("catch err");
    await execFun(`git push origin ${curBranch} -u`);
  }
  await execFun(`git tag ${tag} -a -m "${tag}"`);
  await execFun(`git push origin ${tag}`);
  let endStr = `Successfully taged
  ##########################################
  ${tag}
  ##########################################`;
  console.log(chalk.red(endStr));
}
init();
