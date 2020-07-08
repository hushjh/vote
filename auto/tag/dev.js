const util = require('util');
const exec = util.promisify(require('child_process').exec);
const chalk = require("chalk");


async function execFun(cmdStr){
  const { stdout, stderr } = await exec(cmdStr);
  console.log("stderr:", stderr);
  return {out: stdout, err: stderr};
}

function getTagStr() {
  let now = new Date();
  let year = now.getFullYear();
  let month = now.getMonth() > 10 ? now.getMonth() : '0' + now.getMonth();
  let date = now.getDate() > 10 ? now.getDate() : '0' + now.getDate();
  let hour = now.getHours() > 10 ? now.getHours() : '0' + now.getHours();
  let minute = now.getMinutes() > 10 ? now.getMinutes(): '0' + now.getMinutes();
  let seconde = now.getSeconds() > 10 ? now.getSeconds() : '0' + now.getSeconds();
  return 'dev' + year + month + date + hour + minute + seconde; 
}
async function init() {
  let {out: userName} = await execFun('git config user.name');
  let curBranch = await execFun("git symbolic-ref --short -q HEAD");
  console.log("userName:", userName);
  console.log("curBranch:", curBranch);
  let tag = getTagStr();
  console.log("tag:", tag);
  let cmdStr = `git add . && git commit -m "new tag ${tag} published by ${userName}" --no-verify`;
  await execFun(cmdStr);
  try{
    let et = await execFun('git push');
    console.log("et:", et)
  } catch(err) {
    console.log("catch err");
    await execFun(`git push origin ${curBranch} -u`);
  }
  cmdStr = `git tag ${tag} -a -m "${tag}" && git push origin ${tag}`;
  await execFun(cmdStr);
  let endStr = `Successfully taged
  ##########################################
  ${tag}
  ##########################################`;
  console.log(chalk.red(endStr));
}
init();
