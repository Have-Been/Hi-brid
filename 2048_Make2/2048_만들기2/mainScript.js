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
var score;

function init() {
  score = 0;
    for (var i = 0; i < 16; i++){
        box[i].innerHTML = "";
    }
    //랜덤으로 숫자 생성
    // 1. 2 하나만 생성, 2. 4 하나만 생성, 3. 2와 4 두 개 생성
    var rand = parseInt(Math.random() * 3);
    if (rand == 0) {

    }
    startNum();

}

//매 이동마다 update를 통해 숫자를 업데이트
function update() {
  for(var i = 0; i < 4; i++){
    for(var j = 0; j < 4; j++){
      //box[0] = numArray[0][0]
      //box[5] = numArray[1][1]
      //box[10] = numArray[2][2]
      //box[15] = numArray[3][3]
      //위 법칙을 통해 알 수 있는 것은 box[i] = numArray[4 * i][4 * i + j]
      var a = i * 4;
      var b = a + j;
      if(numArray[i][j] != 0){
        box[b].innerHTML = numArray[i][j];
      } else{
        box[b].innerHTML = "";
      }
      document.getElementById
      numColor(box);
    }
  }
}

//게임 시작
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
              break;
            }
          }
        }
      }
    }
  }
  if (is_move) moveNum();

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
              break;
            }
          }
        }
      }
    }
  }
  if (is_move) moveNum();

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
                  break;
                }
              }
          }
      }
    }
  }
  if (is_move) moveNum();
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
                  break;
                }
            }
          }
      }
    }
  }
  if (is_move) moveNum();
  else checkGameOver();
}

document.addEventListener("keydown", keymove);

function keymove(e) {
  console.log(e.key);
    switch (e.key) {
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

function moveNum() {
    var done = false;
    while(done == false){
        //Math.floor 로 랜덤으로 생성된 숫자들의 소수점을 떼줌
        //[3][3]까지의 수를 뽑아냄
        var num1 = Math.floor(Math.random()*4);
        var num2 = Math.floor(Math.random()*4);
        //0~9 100%의 확률을 뽑아줌
        var rand = parseInt(Math.random() * 10);
        //만약 numArray[num1][num2]에 값이 없다면
        if(numArray[num1][num2] == 0) {
              numArray[num1][num2] = 2;
            //done으로 끝났다고 알려줌.
            done = true;
        }

    }
    update()
}

function startNum() {
  var rand = parseInt(Math.random() * 100);
  for(var i = 0; i < 2; i++){
    var done = false;
    while(done == false){
        //Math.floor 로 랜덤으로 생성된 숫자들의 소수점을 떼줌
        //[3][3]까지의 수를 뽑아냄
        var num1 = Math.floor(Math.random()*4);
        var num2 = Math.floor(Math.random()*4);
        //0~9 100%의 확률을 뽑아줌
        //만약 numArray[num1][num2]에 값이 없다면
        if(numArray[num1][num2] == 0) {
            //1. 2 하나만 나옴
            //rand 깂이 67 ~ 99 (33) 까지일 때
            if(rand > 66){
              numArray[num1][num2] = 2;
              i++;
            }
            //2. 4 하나만 나옴
            //rand 깂이 34 ~ 99 (66) 까지일 때
            else if(rand > 33){
              numArray[num1][num2] = 4;
              i++;
            }
            else{
              if(i == 0) numArray[num1][num2] = 2;
              else numArray[num1][num2] = 4;
            }
            done = true;
        }
    }
  }
  update()
}

// 게임오버 체크
function checkGameOver(){
    for(var i = 0; i < 4; i++){
      //가로열 체크
        var colCheck = numArray[i][0];
        //열에 값이 없다면 리턴
        if(colCheck == 0) return;
        for(var j = 1; j < 4; j++){ 
            if(numArray[i][j] == colCheck || numArray[i][j] == 0) return;
            else colCheck = numArray[i][j];
        }
    }
    for(var i=0; i<4; i++){
      //세로열 체크
        var rowCheck = numArray[0][i];
        if(rowCheck == 0) return;
        for(var j = 1; j < 4; j++){
            if(numArray[j][i] == rowCheck || numArray[j][i] == 0) return;
            else rowCheck = numArray[j][i];
        }
    }
    console.log("gameOver!!");
    gameover();
}

// 게임오버 처리
function gameover(){
  console.log("gameOver!!");
  location.href = "gameOver.html"
}

//칸 색칠

function numColor(box) {
  var boxnum = parseInt(box.innerHTML);
  switch (boxnum) {
    case 0:

    case 2:
      //글자 색
      box.style.color = "#684A23";
      //배경 색
      box.style.background = "#FBEDDC";
      break;

    case 4:
      box.style.color = "#684A23";
      box.style.background = "#F9E2C7";
      break;

    case 8:
      box.style.color = "#684A23";
      box.style.background = "#F6D5AB";
      break;

    case 16:
      box.style.color = "#684A23";
      box.style.background = "#F2C185";
      break;

    case 32:
      box.style.color = "#684A23";
      box.style.background = "#EFB46D";
      break;

    case 64:
      box.style.color = "#FFFFFF";
      box.style.background = "#EBA24A";
      break;

    case 128:
      box.style.color = "#FFFFFF";
      box.style.background = "#E78F24";
      break;

    case 256:
      box.style.color = "#FFFFFF";
      box.style.background = "#E87032";
      break;

    case 512:
      box.style.color = "#FFFFFF";
      box.style.background = "#E85532";
      break;

    case 1024:
      box.style.color = "#FFFFFF";
      box.style.background = "#E84532";
      break;

    case 2048:
      box.style.color = "#FFFFFF";
      box.style.background = "#E83232";
      break;

    default:
      break;
  }
}
