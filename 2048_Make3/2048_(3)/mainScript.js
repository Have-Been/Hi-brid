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
var numArray = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
//점수 함수
var score;

//웹페이지가 열리면 바로 게임이 시작
init();

//게임이 시작될 때
function init() {
  //점수는 0점으로 초기화
  score = 0;
  //16개의 블럭의 텍스트를 빈 칸으로 초기화
  for (var i = 0; i < 16; i++) {
    box[i].innerHTML = "";
  }
  //시작 시 랜덤으로 숫자를 생성
  startNum();
}

//매 이동마다 update를 통해 숫자를 업데이트
function update() {
  // i 와 j는 행과 열
  for (var i = 0; i < 4; i++) {
    for (var j = 0; j < 4; j++) {
      //box[0] = numArray[0][0]
      //box[5] = numArray[1][1]
      //box[10] = numArray[2][2]
      //box[15] = numArray[3][3]
      //위 법칙을 통해 알 수 있는 것은 box[i] = numArray[4 * i][4 * i + j]
      var a = i * 4;
      var b = a + j;
      //만약 numArray[i][j] 에 값이 들어가있다면
      if (numArray[i][j] != 0) {
        //화면에 numArray[i][j] 에 들어있는 수를 box[b]에 그려줌 
        box[b].innerHTML = numArray[i][j];
      } else {
        //아니라면 빈칸으로 그려줌
        box[b].innerHTML = "";
      }
      //update 를 통해 매번 scoreText에 score 를 점수로 표기
      document.getElementById("scoreText").innerHTML = score;
      //update 를 통해 숫자마다 색을 매번 달리해서 칠해줌
      coloring();
    }
  }
}

//키보드 윗 방향키를 눌렀을 때 함수
//4개의 함수 다 설명이 같으니 아래 keyRight 참고
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
  if (is_move) {
    score += 1;
    InsertNewBlock();
  }
  else {
    score = score;
    checkGameOver();
  }
}

//키보드 아래 방향키를 눌렀을 때 함수
function keyDown() {
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
  if (is_move) {
    score += 1;
    InsertNewBlock();
  }
  else {
    score = score;
    checkGameOver();
  }
}

//키보드 왼쪽 방향키를 눌렀을 때 함수
function keyLeft() {
  var is_move = false;

  for (var k = 0; k < 4; k++) {
    for (var i = 0; i < 4; i++) {
      if (numArray[k][i] != 0) { // 해당 위치에 값이 있다면 (타겟 설정)
        var value = numArray[k][i];
        for (var j = i - 1; j >= 0; j--) { // 이동시킬 위치를 탐색할꺼예용
          if (numArray[k][j] == 0) { // 값 비어잇냐?
            numArray[k][j + 1] = 0;
            numArray[k][j] = value;
            is_move = true;
            //타겟을 이동시키고 그 자리는 0으로 비워둠
          } // 이동
          else if (numArray[k][j] != 0) { //값 안비엇냐?
            if (numArray[k][j + 1] == numArray[k][j]) { //값이 똑같다면
              numArray[k][j + 1] = 0;
              numArray[k][j] *= 2;
              is_move = true;
              break;
            }
            else if (numArray[k][j] != numArray[k][j + 1]) { //값이 안 똑같다면
              numArray[k][j + 1] = 0;
              numArray[k][j + 1] = value;
              break;
            }
          }
        }
      }
    }
  }
  if (is_move) {
    score += 1;
    InsertNewBlock();
  }
  else {
    score = score;
    checkGameOver();
  }
}

//키보드 오른쪽 방향키를 눌렀을 때 함수
function keyRight() {
  //한쪽만 눌렀다고 숫자가 무한히 생성되지 않기 위함
  //이동할 때 true 로 바꿈
  var is_move = false;
  // k = 행
  // i = 타겟의 값
  // j = 이동할 위치
  for (var k = 0; k < 4; k++) {
    for (var i = 4; i >= 0; i--) {
      if (numArray[k][i] != 0) { // 해당 위치에 값이 있다면 (타겟 설정)
        //임시로 값을 저장해주는 value 변수 생성
        var value = numArray[k][i];
        for (var j = i + 1; j < 4; j++) { // 이동시킬 위치를 탐색할꺼예용

          if (numArray[k][j] == 0) { // 값 비어잇냐?
          //화면상으로는 바로 움직이는 것으로 보이겠지만 한칸 움직이고 그 전칸 지우고 움직이고 지우고를 반복한다.

            //이전에 있는 칸의 값을 0으로 만들어 없애주고
            numArray[k][j - 1] = 0;
            //그 다음 칸은 임시로 저장해두었던 value를 불러와 저장해 움직인 것처럼 보이게 해준다.
            numArray[k][j] = value;
            //이동했다는 것을 알려줌 -> true
            is_move = true;
          }
          //값이 똑같다면 or 안 똑같다면
          else if (numArray[k][j] != 0) { //값 안비엇냐?
            if (numArray[k][j - 1] == numArray[k][j]) { //값이 똑같다면
              //이전에 있는 칸은 0으로 만들어 없애주고
              numArray[k][j - 1] = 0;
              //그 다음에 있는 칸은 숫자가 같기 때문에 *2 를 해서 합쳐진 것처럼 보이게 만듬
              numArray[k][j] *= 2;
              //이동했으니 이동했다는 것을 알려줌 -> true
              is_move = true;
              break;
            }
            else if (numArray[k][j] != numArray[k][j - 1]) { //그 다음에 있는 칸의 값과 이전에 있는 칸의 값이 같지 않다면
              //그 이전에 있는 칸의 값을 0으로 비워주고
              numArray[k][j - 1] = 0;
              //그 이전에 있는 칸의 값을 그대로 남겨준다.
              numArray[k][j - 1] = value;
              break;
            }
          }
        }
      }
    }
  }
  //만약에 이동했다면
  if (is_move) {
    //score 를 1 더해주고
    score += 1;
    //랜덤한 위치에 2를 생성
    InsertNewBlock();
  }
  //아니라면
  else {
    //score 를 그대로 남겨주고
    score = score;
    //Gameover 가 되는지 체크
    checkGameOver();
  }
}

//키보드가 눌러지는 이벤트를 받음
document.addEventListener("keydown", keymove);

//키보드를 눌렀을 때 작동되는 이벤트 함수
function keymove(e) {
  //log로 누른 키보드 방향을 알려줌
  console.log(e.key);
  switch (e.key) {
    case 'ArrowUp': //위
      keyUp();
      update();
      break; 
    case 'ArrowDown': //아래
      keyDown();
      update();
      break; 
    case 'ArrowLeft': //왼쪽
      keyLeft();
      update();
      break; 
    case 'ArrowRight': //오른쪽
      keyRight();
      update();
      break; 
    default:
      break;
  }
}

//움직일 시 랜덤한 위치에 2를 생성해주는 함수
function InsertNewBlock() {
  //done이라는 변수를 만들어 2를 생성했는지 안했는지를 체크
  var done = false;
  //2가 생성이 안됐다면
  while (done == false) {
    //Math.floor 로 랜덤으로 생성된 숫자들의 소수점을 떼줌
    //[3][3]까지의 수를 뽑아냄
    var num1 = Math.floor(Math.random() * 4);
    var num2 = Math.floor(Math.random() * 4);

    //만약 numArray[num1][num2]에 값이 없다면
    if (numArray[num1][num2] == 0) {
      numArray[num1][num2] = 2;
      //done으로 생성이 완료되었다고 알려줌 = true
      done = true;
    }

  }
  //이후 uupdate() 함수를 호출 -> 화면에 띄워줌
  update()
}

//맨 처음 시작했을 때 랜덤하게 생성되는 숫자
function startNum() {
  //100%의 확률을 뽑는 변수
  var rand = parseInt(Math.random() * 100);

  for (var i = 0; i < 2; i++) {
    var done = false;
    while (done == false) {
      //Math.floor 로 랜덤으로 생성된 숫자들의 소수점을 떼줌
      //[3][3]까지의 수를 뽑아냄
      var num1 = Math.floor(Math.random() * 4);
      var num2 = Math.floor(Math.random() * 4);

      //만약 numArray[num1][num2]에 값이 없다면
      if (numArray[num1][num2] == 0) {
        //1. 2 하나만 나옴
        //rand 값이 67 ~ 99 (33) 까지일 때
        if (rand > 66) {
          //숫자 2 블록을 생성
          numArray[num1][num2] = 2;
          i++;
        }
        //2. 4 하나만 나옴
        //rand 값이 34 ~ 99 (66) 까지일 때
        else if (rand > 33) {
          //숫자 4블록을 생성
          numArray[num1][num2] = 4;
          i++;
        }
        //3. 2와 4가 동시에 나옴 (단, 같은 숫자가 2개 나오면 안됌.)
        else {
          //숫자 2블록과 4블록을 생성
          if (i == 0) numArray[num1][num2] = 2;
          else numArray[num1][num2] = 4;
        }
        //done 으로 생성이 완료되었다고 알려줌
        done = true;
      }
    }
  }
  //이후 update() 함수를 호출 -> 화면에 띄워줌
  update()
}

// 게임오버 체크
function checkGameOver() {
  for (var i = 0; i < 4; i++) {
    //가로열 체크
    var colCheck = numArray[i][0];
    //열에 값이 없다면 리턴
    if (colCheck == 0) return;
    for (var j = 1; j < 4; j++) {
      if (numArray[i][j] == colCheck || numArray[i][j] == 0) return;
      else colCheck = numArray[i][j];
    }
  }

  for (var i = 0; i < 4; i++) {
    //세로열 체크
    var rowCheck = numArray[0][i];
    if (rowCheck == 0) return;
    for (var j = 1; j < 4; j++) {
      if (numArray[j][i] == rowCheck || numArray[j][i] == 0) return;
      else rowCheck = numArray[j][i];
    }
  }
  //gameOver 함수 호출
  gameover();
}

// 게임오버 처리
function gameover() {
  //log 로 game를 찍어줌
  console.log("gameOver!!");
  // gameOver.html 문서로 이동하여 gameover 로 처리함
  location.href = "gameOver.html"
}

//숫자별로 칸 색 칠하기
function coloring() {
  //box의 16개 칸 전부 체크
  for (var i = 0; i < 16; i++) {
    //만약에 HTML 상으로 표시되어 있는 문자가 비어있다면
    if (box[i].innerHTML == "") {
      box[i].style.color = "#684A23";
      box[i].style.background = "#FBEDDC";
    }
    //만약에 HTML 상으로 표시되어 있는 문자가 "2" 라면
    else if (box[i].innerHTML == "2") {
      //글자 색
      box[i].style.color = "#684A23";
      //배경 색
      box[i].style.background = "#f5e0c6";
    }
    else if (box[i].innerHTML == "4") {
      box[i].style.color = "#684A23";
      box[i].style.background = "#f0d6b6";
    }
    else if (box[i].innerHTML == "8") {
      box[i].style.color = "#684A23";
      box[i].style.background = "#f2cea0";
    }
    else if (box[i].innerHTML == "16") {
      box[i].style.color = "#684A23";
      box[i].style.background = "#F2C185";
    }
    else if (box[i].innerHTML == "32") {
      box[i].style.color = "#684A23";
      box[i].style.background = "#EFB46D";
    }
    else if (box[i].innerHTML == "64") {
      box[i].style.color = "#FFFFFF";
      box[i].style.background = "#EBA24A";
    }
    else if (box[i].innerHTML == "128") {
      box[i].style.color = "#FFFFFF";
      box[i].style.background = "#E78F24";
    }
    else if (box[i].innerHTML == "256") {
      box[i].style.color = "#FFFFFF";
      box[i].style.background = "#E87032";
    }
    else if (box[i].innerHTML == "512") {
      box[i].style.color = "#FFFFFF";
      box[i].style.background = "#E85532";
    }
    else if (box[i].innerHTML == "1024") {
      box[i].style.color = "#FFFFFF";
      box[i].style.background = "#E84532";
    }
    else if (box[i].innerHTML == "2048") {
      box[i].style.color = "#FFFFFF";
      box[i].style.background = "#E83232";
    }
  }
}
