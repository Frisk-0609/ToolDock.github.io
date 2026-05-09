let timerStringDOM;

let startTime;
let timerId = null;

let currentTimerTime = 0;

// モード
let mode = "stopwatch";

// タイマー用制限時間
let limitTime = 0;

window.onload = function () {
  timerStringDOM = document.getElementById("timerString");
  timerStringDOM.textContent = "00:00";
};

// ミリ秒 → mm:ss
function msecToSecString(time) {

  if (time < 0) {
    time = 0;
  }

  time = Math.floor(time / 1000);

  const seconds = time % 60;
  const minutes = Math.floor(time / 60);

  const secondStr = (seconds < 10 ? "0" : "") + String(seconds);
  const minutesStr = (minutes < 10 ? "0" : "") + String(minutes);

  return minutesStr + ":" + secondStr;
}

// モード変更
function ChangeMode() {

  const select = document.getElementById("modeSelect");

  mode = select.value;

  OnResetButtonClick();

  // タイマーモードだけ入力欄表示
  const timerInput = document.getElementById("timerInput");

  if (mode === "timer") {
    timerInput.style.display = "block";
  }
  else {
    timerInput.style.display = "none";
  }
}

// 更新
function UpdateTimer() {

  const nowTime = new Date().getTime();

  // ストップウォッチ
  if (mode === "stopwatch") {

    currentTimerTime = nowTime - startTime;

  }

  // タイマー
  else if (mode === "timer") {

    currentTimerTime = limitTime - (nowTime - startTime);

    // 0になったら停止
    if (currentTimerTime <= 0) {

      currentTimerTime = 0;

      clearInterval(timerId);

      timerId = null;
    }
  }

  timerStringDOM.textContent = msecToSecString(currentTimerTime);
}

// スタート
function OnStartButtonClick() {

  // 既に動いているなら何もしない
  if (timerId != null) {
    return;
  }

  // タイマーモード
  if (mode === "timer") {

    // 初回スタート時
    if (currentTimerTime === 0) {

      const minutes =
        parseInt(document.getElementById("minutes").value) || 0;

      const seconds =
        parseInt(document.getElementById("seconds").value) || 0;

      limitTime = (minutes * 60 + seconds) * 1000;

      currentTimerTime = limitTime;
    }

    startTime = new Date().getTime()
      - (limitTime - currentTimerTime);
  }

  // ストップウォッチ
  else {

    startTime = new Date().getTime() - currentTimerTime;

  }

  timerId = setInterval(UpdateTimer, 100);
}

// ストップ
function OnStopButtonClick() {

  if (timerId == null) {
    return;
  }

  clearInterval(timerId);

  timerId = null;
}

// リセット
function OnResetButtonClick() {

  OnStopButtonClick();

  currentTimerTime = 0;

  timerStringDOM.textContent = "00:00";
}
