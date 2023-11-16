//정답
const answer = "APPLE";

let index = 0;
let attempts = 0;
let timer;

//로직진행
function appStart() {
  const displayGameOver = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display:flex; justify-contents:center; align-items:center; position:absolute; top:40vh; left:38%; background-color:white; width:200px; height:100px;";
    document.body.appendChild(div);
  };

  const nextLine = () => {
    if (attempts === 6) return gameover();
    attempts += 1;
    index = 0;
  };

  //게임종료
  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown);
    displayGameOver();
    //게임종료 시 시간도 멈춰야 하므로...
    clearInterval(timer);
  };

  //엔터키를 누를 경우
  const handleEnterKey = () => {
    //정답확인
    console.log("엔터키 입력!!");

    //맞은 개수
    let check_answer = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-column[data-index='${attempts}${i}']`
      );
      //입력글자
      const input_key = block.innerText;
      //정답글자
      const answer_key = answer[i];

      //만약 입력글자와 정답글자가 같을때
      if (input_key === answer_key) {
        check_answer += 1;
        block.style.background = "#6AAA64";
      }
      //정답글자에는 들어가 있는 경우(자리 차이 때문에)
      else if (answer.includes(input_key)) {
        block.style.background = "#C9B458";
      } else {
        block.style.background = "#787C7E";
      }
      block.style.color = "white";
    }

    if (check_answer === 5) {
      //게임종료
      gameover();
    } else {
      //다음줄로 이동
      nextLine();
    }
  };

  //지우기 버튼을 누를경우(backspace)
  const handleBackspace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-column[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  //키 입력시 적용
  const handleKeyDown = (event) => {
    // console.log("키 상태 확인!! event => ", event);
    // console.log(event.key, event.keyCode);

    const key = event.key.toUpperCase();
    const keyCode = event.keyCode;
    const thisBlock = document.querySelector(
      `.board-column[data-index='${attempts}${index}']`
    );

    if (event.key === "Backspace") handleBackspace();
    else if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      else return;
    } else if (65 <= keyCode && keyCode <= 90) {
      thisBlock.innerText = key;
      index += 1;
    }
  };

  // 버튼 클릭 이벤트를 추가하는 함수
  // const addButtonClickEvents = () => {
  //   const buttons = document.querySelectorAll(".keyboard-column");
  //   console.log(buttons);

  //   buttons.forEach((button) => {
  //     button.addEventListener("click", function () {
  //       const letter = this.getAttribute("data-key"); // 해당 버튼의 데이터 속성 값 가져오기
  //       const boardColumns = document.querySelector(
  //         `.board-column[data-index='${attempts}${index}']`
  //       );

  //       // 입력 가능한 위치에 글자 추가
  //       for (let i = 0; i < boardColumns.length; i++) {
  //         if (boardColumns[i].innerText === "") {
  //           boardColumns[i].innerText = letter;
  //           index++; // 인덱스 증가
  //           break;
  //         }
  //       }
  //     });
  //   });
  // };

  const startTimer = () => {
    //시작시간
    const start_time = new Date();
    function setTime() {
      //현재 시간
      const now_time = new Date();
      //클리어 시간
      const finish_time = new Date(now_time - start_time);

      const minute = finish_time.getMinutes().toString().padStart(2, "0");
      const seconds = finish_time.getSeconds().toString().padStart(2, "0");
      const timeDiv = document.querySelector("#timer");
      timeDiv.innerText = `${minute}:${seconds}`;
    }

    //주기성
    timer = setInterval(setTime, 1000);
  };

  startTimer();
  window.addEventListener("keydown", handleKeyDown);
  // window.addEventListener("load", addButtonClickEvents);
}

appStart();
