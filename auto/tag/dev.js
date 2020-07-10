const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require("chalk");
const fs = require("fs");
const path = require("path");
const ora = require('ora')

const spinner = ora('taging for dev...')
spinner.start()

async function execFun(cmdStr){
  const { stdout, stderr } = await exec(cmdStr);
  if (stderr) {
    console.log("stderr:", stderr);
  }
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
function updateConfigFile(userName, curBranch, tag) {
  let configFilePath = path.resolve(__dirname, '../../src/configuration/dev.js');
  let devStr = "";
  try {
    devStr = fs.readFileSync(configFilePath, 'utf-8');
  } catch (err) {
    console.log('文件缺失src/configuration/dev.js', err)
  }
  devTemp = devStr.replace(/version: \'([\w\s\.\-\,]+)\'/,function(rs,$1){
    newVersion = `version: 'The current version is ${tag} from ${curBranch} branch, published by ${userName}'`;
    return newVersion;
  })
  fs.writeFile(configFilePath, devTemp, (err) => {
    if (err) {
      console.log(err);
    }
  });
}
async function init() {
  let {out: userName} = await execFun('git config user.name');
  let {out: curBranch} = await execFun("git symbolic-ref --short -q HEAD");
  // 去掉尾部 回车
  userName = userName.replace(/[ ]|[\r\n]/g,"");
  curBranch = curBranch.replace(/[ ]|[\r\n]/g,"");
  let tag = getTagStr();
  updateConfigFile(userName, curBranch, tag);
  await execFun(`git add .`);
  try{
    await execFun(`git commit -m "new tag ${tag} published by ${userName}" --no-verify`);
  } catch (err) {
    console.log("无需提交的内容");
  }
  try{
    let et = await execFun('git push');
  } catch(err) {
    await execFun(`git push origin ${curBranch} -u`);
  }
  let {out: tagout, stderr: err} = await execFun(`git tag ${tag} -a -m "${tag}"`);
  await execFun(`git push origin ${tag}`);
  console.log("tag:", tagout, "err:", err);
  spinner.stop()
  let endStr = `Successfully taged
##########################################
  ${tag}
##########################################`;
  console.log(chalk.red(endStr));
}
init();

