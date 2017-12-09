function Alert(danger) {
  if(danger.length == 0){
    return console.log("No invaders found");
  }
  this.length = danger.length;
  this.danger = danger;
  console.log(`There are ${this.length} enemies approaching`)
  for(let i = 0; i < this.length; i++){
    console.log(`Enemy no.${i + 1} is located at line:${this.danger[i].line} char:${this.danger[i].line}`);
  }
  return
}
module.exports = {Alert};
