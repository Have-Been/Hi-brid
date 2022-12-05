const { createApp } = Vue;
createApp({
    data() {
        return {
            bgcount: 16,
        }
    },
    mounted() {
        console.log("마운트 성공!!");
    },
}).mount("#app");

//Vue

//main java

//div 내 게임판 배열
var box = document.getElementsByClassName('bgBlock');
//숫자 배열
var numArray = [[0,0,0,0], [0,0,0,0], [0,0,0,0], [0,0,0,0]];
var test = [0,0,0,0];

function init() {
    for (var i = 0; i < 16; i++){
        box[i].innerHTML = "";
    }
    randomNum();
    randomNum();
}

function update() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      var a = i * 4;
      var b = a + j;
      if(numArray[i][j] != 0){
        box[b].innerHTML = numArray[i][j];
      }else{
        box[b].innerHTML = "";
      }
    }
  }
}

function start() {

    init();
}

function keyUp() {

  var is_move = false;

  for (var i = 0; i < 4; i++) {
    for (var k = 0; k < 4; k++) {
      if (numArray[k][i] != 0) { // 해당 위치에 값이 있다면 (타겟 설정)
        var value = numArray[k][i];
        for (var j = k - 1; j >= 0; j--) { // 이동시킬 위치를 탐색할꺼예용
          if (numArray[j][i] == 0) { // 값 비어잇냐?
            numArray[j + 1][i] = 0;
            numArray[j][i] = value;
            is_move = true;
            //타겟을 이동시키고 그 자리는 0으로 비워둠
          } // 이동
          else if (numArray[j][i] != 0) { //값 안비엇냐?
            if (numArray[j + 1][i] == numArray[j][i]) { //값이 똑같다면
              numArray[j + 1][i] = 0;
              numArray[j][i] *= 2;
              is_move = true;
              break;
            }
            else if (numArray[j][i] != numArray[j + 1][i]) { //값이 안 똑같다면
              numArray[j + 1][i] = 0;
              numArray[j + 1][i] = value;
              is_move = true;
              break;
            }
          }
        }
      }
    }
  }
  if (is_move) randomNum();

}

function keyDown(){
  var is_move = false;

  for (var i = 0; i < 4; i++) {
    for (var k = 3; k >= 0; k--) {
      if (numArray[k][i] != 0) { // 해당 위치에 값이 있다면 (타겟 설정)
        var value = numArray[k][i];
        for (var j = k + 1; j < 4; j++) { // 이동시킬 위치를 탐색할꺼예용
          if (numArray[j][i] == 0) { // 값 비어잇냐?
            numArray[j - 1][i] = 0;
            numArray[j][i] = value;
            is_move = true;
            //타겟을 이동시키고 그 자리는 0으로 비워둠
          } // 이동
          else if (numArray[j][i] != 0) { //값 안비엇냐?
            if (numArray[j - 1][i] == numArray[j][i]) { //값이 똑같다면
              numArray[j - 1][i] = 0;
              numArray[j][i] *= 2;
              is_move = true;
              break;
            }
            else if (numArray[j][i] != numArray[j - 1][i]) { //값이 안 똑같다면
              numArray[j - 1][i] = 0;
              numArray[j - 1][i] = value;
              is_move = true;
              break;
            }
          }
        }
      }
    }
  }
  if (is_move) randomNum();

}

function keyLeft(){
  var is_move = false;

  for(var k = 0; k < 4; k++){
    for (var i = 0; i < 4; i++) {
      if(numArray[k][i] != 0){ // 해당 위치에 값이 있다면 (타겟 설정)
        var value = numArray[k][i];
          for (var j = i - 1; j >= 0; j--) { // 이동시킬 위치를 탐색할꺼예용
            if (numArray[k][j] == 0) { // 값 비어잇냐?
              numArray[k][j + 1] = 0;
              numArray[k][j] = value;
              is_move = true;
              //타겟을 이동시키고 그 자리는 0으로 비워둠
            } // 이동
            else if(numArray[k][j] != 0) { //값 안비엇냐?
              if (numArray[k][j + 1] == numArray[k][j])
                { //값이 똑같다면
                  numArray[k][j + 1] = 0;
                  numArray[k][j] *= 2;
                  is_move = true;
                  break;
                }
                else if (numArray[k][j] != numArray[k][j + 1])
                { //값이 안 똑같다면
                  numArray[k][j + 1] = 0;
                  numArray[k][j + 1] = value;
                  is_move = true;
                  break;
                }
              }
          }
      }
    }
  }
  if(is_move) randomNum();
}

function keyRight(){
  //한쪽만 눌렀다고 숫자가 무한히 생성되지 않기 위함
  //이동할 때 true 로 바꿈
  var is_move = false;
  // k = 행
  // i = 타겟의 값
  // j = 이동할 위치
  for(var k = 0; k < 4; k++){
    for (var i = 4; i >= 0; i--) {
      if(numArray[k][i] != 0){ // 해당 위치에 값이 있다면 (타겟 설정)
        var value = numArray[k][i];
          for (var j = i + 1; j < 4; j++) { // 이동시킬 위치를 탐색할꺼예용
            if (numArray[k][j] == 0) { // 값 비어잇냐?
              numArray[k][j - 1] = 0;
              numArray[k][j] = value;
              is_move = true;
              //타겟을 이동시키고 그 자리는 0으로 비워둠
            } // 이동
            else if(numArray[k][j] != 0) { //값 안비엇냐?
                if(numArray[k][j-1] == numArray[k][j])
                { //값이 똑같다면
                  numArray[k][j-1] = 0;
                  numArray[k][j] *= 2;
                  is_move = true;
                  break;
                }
                else if (numArray[k][j] != numArray[k][j-1])
                { //값이 안 똑같다면
                  numArray[k][j-1] = 0;
                  numArray[k][j-1] = value;
                  is_move = true;
                  break;
                }
            }
          }
      }
    }
  }
  if(is_move) randomNum();
}

document.addEventListener("keydown", keymove);

function keymove(e) {
  console.log(e.key);
    switch (e.key) {
      case 'Enter':
      start();
      break;
      case 'ArrowUp' :
      keyUp();
      update();
      break; //위
      case 'ArrowDown' :
      keyDown();
      update();
      break; //아래
      case 'ArrowLeft' :
      keyLeft();
      update();
      break; //왼쪽
      case 'ArrowRight' :
      keyRight();
      update();
      break; //오른쪽
      default:
        break;
    }
}

function randomNum() {
    var done = false;
    while(done == false){
        //16까지의 수를 뽑아냄
        //Math.floor 로 랜덤으로 생성된 숫자들의 소수점을 떼줌
        var num1 = Math.floor(Math.random()*4);
        var num2 = Math.floor(Math.random()*4);
        //만약 numArray[num1][num2]이 0이라면
        if(numArray[num1][num2] == 0) {
          var rand = parseInt(Math.random() * 10);
            //랜덤으로 숫자를 생성해줌.
            if(rand == 0){
              numArray[num1][num2] = 4;
            }else{
              numArray[num1][num2] = 2;
            }
            //done으로 끝났다고 알려줌.
            done = true;
        }
    }
    update()
}

//숫자 생성 확률을 뽑아줌
//function getNewNum() {

    // 10% 확률로 4가 나오고, 90% 확률로 2가 나온다.

    //return 2;
//}



