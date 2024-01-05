const questions = [
    { question: "散步在櫻花樹下，花瓣飄落在地，你會：", options: ["A. 開心地拾起花瓣", "B. 保持步伐繼續走"] },
    { question: "看到天空中飄落著巧克力瀑布，你會：", options: ["A. 伸手接住巧克力", "B. 繼續走路不為所動"] },
    { question: "在路上遇到迷路的小動物，你會：", options: ["A. 幫助尋找正確的路", "B. 繼續走自己的路"] },
    { question: "遠處有一片飄動的音樂，你會：", options: ["A. 走向音樂的來源", "B. 無視音樂繼續前進"] },
    { question: "路邊有個擺攤販售美味甜點，你會：", options: ["A. 馬上停下來品嚐", "B. 不為所動，繼續前進"] },
  ];

  let currentQuestionIndex = 0;
  let answers = [];

  // 新增雷達圖的資料
  const radarChartData = {
    labels: ['甜度', '口感', '外觀', '香氣', '創意'],
    datasets: [
      {
        label: "MBTI 甜點能力值",
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        pointBackgroundColor: "rgba(75,192,192,1)",
        pointBorderColor: "#000",
        pointHoverBackgroundColor: "#000",
        pointHoverBorderColor: "rgba(75,192,192,1)",
        data: [0, 0, 0, 0],
      },
    ],
  };

  // 新增雷達圖的設定
  const radarChartOptions = {
    scale: {
      ticks: { beginAtZero: true, max:4 },
    },
    
  };

  function displayQuestion() {
    const questionElement = $("#question");
    const optionsElement = $("#options");
    const nextButton = $("#nextButton");
    const completeButton = $("#completeButton");
    const currentQuestion = questions[currentQuestionIndex];

    questionElement.text(currentQuestion.question);
    optionsElement.empty();

    $.each(currentQuestion.options, (index, option) => {
      const button = $("<button>").text(option).click(() => selectOption(index));
      optionsElement.append(button);
    });

    nextButton.hide();
    completeButton.hide();
  }

  function selectOption(index) {
    answers.push(index);
    showNextButton();
  }

  function showNextButton() {
    const nextButton = $("#nextButton");
    const completeButton = $("#completeButton");

    if (currentQuestionIndex < questions.length - 1) {
      nextButton.show();
      completeButton.hide();
    } else {
      nextButton.hide();
      completeButton.show();
    }
  }

  function hideNextButton() {
    const nextButton = $("#nextButton");
    nextButton.hide();
  }

  function nextQuestion() {
    if (answers.length > currentQuestionIndex) {
      currentQuestionIndex++;
      hideNextButton();
    }

    if (currentQuestionIndex < questions.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }

// MBTI 類型與甜點名稱的對應表
const typeNames = {
'ISTJ': '焦糖風味的堅果酥餅',
'ISFJ': '巧克力慕斯',
'INFJ': '覆盆子奶酪蛋糕',
'INTJ': '黑森林蛋糕',
'ISTP': '檸檬塔',
'ISFP': '覆盆子鮮奶油蛋糕',
'INFP': '草莓千層蛋糕',
'INTP': '提拉米蘇',
'ESTP': '巧克力爆米花',
'ESFP': '水果沙拉',
'ENFP': '草莓冰淇淋',
'ENTP': '榛果拿鐵',
'ESTJ': '榛果朱古力',
'ESFJ': '水果拼盤',
'ENFJ': '巧克力瑪奇朵',
'ENTJ': '焦糖拿鐵',
};

// MBTI 類型與甜點描述的對應表
const typeDescriptions = {
'ISTJ': '帶有堅果的香脆口感，搭配著濃郁的焦糖風味。',
'ISFJ': '細緻濃郁的巧克力口感，像是一場充滿溫暖的擁抱。',
'INFJ': '酸甜的覆盆子與滑順的奶酪層次分明，如同心靈的安撫。',
'INTJ': '濃郁的巧克力與櫻桃的組合，散發著深邃的神秘感。',
'ISTP': '清新的檸檬香氣，酸酸甜甜勾勒出一抹陽光明媚的味道。',
'ISFP': '柔軟的蛋糕搭配新鮮的覆盆子和濃郁的鮮奶油。',
'INFP': '層層疊疊的草莓與輕盈的蛋糕，彷彿漫步在花海中。',
'INTP': '咖啡浸泡的手指餅乾與濃郁的香醇香味，讓人沉浸在意境中。',
'ESTP': '爽脆的爆米花裹上香濃巧克力，是無法抗拒的誘惑。',
'ESFP': '多彩的水果組合，清新爽口，如同一曲歡快的音符。',
'ENFP': '紅潤的草莓與冰涼的淇淋相融，帶來愉悅的口感。',
'ENTP': '濃郁的榛果風味與香醇的咖啡，展現出獨特的風采。',
'ESTJ': '濃郁的朱古力與香氣四溢的榛果，散發出堅定的品味。',
'ESFJ': '各式水果的繽紛色彩，彰顯出熱情洋溢的氛圍。',
'ENFJ': '濃郁的巧克力與香醇的咖啡，展現出深情的一面。',
'ENTJ': '香濃的焦糖與濃郁的咖啡，展現出堅定的領導風格。',
};

// MBTI 類型與能力值的對應表
const typeAbilities = {
'ISTJ': [30, 20, 10, 30],  // 代表 E/I, S/N, T/F, J/P 的能力值
'ISFJ': [2, 2, 3, 2],
'INFJ': [2, 3, 3, 2],
'INTJ': [2, 3, 3, 3],
'ISTP': [3, 1, 2, 3],
'ISFP': [2, 2, 3, 2],
'INFP': [2, 3, 3, 2],
'INTP': [3, 3, 3, 1],
'ESTP': [3, 1, 2, 3],
'ESFP': [2, 2, 3, 2],
'ENFP': [2, 3, 3, 2],
'ENTP': [3, 3, 3, 1],
'ESTJ': [3, 1, 1, 3],
'ESFJ': [2, 2, 3, 3],
'ENFJ': [2, 3, 3, 3],
'ENTJ': [3, 3, 1, 3],
};

// 甜點類型與好友的對應表
const dessertFriends = {
'焦糖風味的堅果酥餅': ['巧克力蛋糕', '提拉米蘇', '黑森林蛋糕'],
'巧克力慕斯': ['草莓千層蛋糕', '榛果拿鐵', '焦糖拿鐵'],
'覆盆子奶酪蛋糕': ['水果沙拉', '草莓冰淇淋', '覆盆子鮮奶油蛋糕'],
'黑森林蛋糕': ['焦糖風味的堅果酥餅', '提拉米蘇', '榛果拿鐵'],
'檸檬塔': ['覆盆子奶酪蛋糕', '水果拼盤', '焦糖拿鐵'],
'覆盆子鮮奶油蛋糕': ['草莓冰淇淋', '提拉米蘇', '焦糖風味的堅果酥餅'],
'草莓千層蛋糕': ['檸檬塔', '水果拼盤', '焦糖拿鐵'],
'提拉米蘇': ['檸檬塔', '黑森林蛋糕', '覆盆子奶酪蛋糕'],
'巧克力爆米花': ['榛果拿鐵', '草莓千層蛋糕', '焦糖風味的堅果酥餅'],
'水果沙拉': ['焦糖拿鐵', '提拉米蘇', '覆盆子奶酪蛋糕'],
'草莓冰淇淋': ['焦糖風味的堅果酥餅', '檸檬塔', '覆盆子鮮奶油蛋糕'],
'榛果拿鐵': ['黑森林蛋糕', '提拉米蘇', '巧克力慕斯'],
'榛果朱古力': ['焦糖拿鐵', '草莓千層蛋糕', '水果沙拉'],
'水果拼盤': ['檸檬塔', '草莓千層蛋糕', '覆盆子鮮奶油蛋糕'],
'巧克力瑪奇朵': ['焦糖拿鐵', '榛果朱古力', '黑森林蛋糕'],
'焦糖拿鐵': ['黑森林蛋糕', '提拉米蘇', '榛果拿鐵'],
};

// 取得特定甜點類型的好友
function getDessertFriends(dessertType) {
return dessertFriends[dessertType] || [];
}

 // 甜點MBTI結果計算
function calculateMBTIType() {
const result = [];

const extrovertedCount = answers.filter(answer => answer === 0).length;
const introvertedCount = answers.filter(answer => answer === 1).length;
result.push(extrovertedCount > introvertedCount ? 'E' : 'I');

const sensingCount = answers.filter(answer => answer === 0 || answer === 2).length;
const intuitionCount = answers.filter(answer => answer === 1 || answer === 3).length;
result.push(sensingCount > intuitionCount ? 'S' : 'N');

const thinkingCount = answers.filter(answer => answer % 2 === 0).length;
const feelingCount = answers.filter(answer => answer % 2 === 1).length;
result.push(thinkingCount > feelingCount ? 'T' : 'F');

const judgingCount = answers.filter(answer => answer === 0 || answer === 3).length;
const perceivingCount = answers.filter(answer => answer === 1 || answer === 2).length;
result.push(judgingCount > perceivingCount ? 'J' : 'P');

return result.join('');
}

// 更新雷達圖資料
function updateRadarChartData(mbtiType) {
const radarData = radarChartData.datasets[0].data;
for (let i = 0; i < mbtiType.length; i++) {
  radarData[i] = mbtiType.charCodeAt(i) - 'A'.charCodeAt(0);
}
}

// 繪製雷達圖
function drawRadarChart() {
const radarCanvas = document.getElementById('radarChart');
const ctx = radarCanvas.getContext('2d');

new Chart(ctx, {
  type: 'radar',
  data: radarChartData,
  options: radarChartOptions,
});
}
// 顯示 MBTI 類型結果，甜點描述，甜點名稱，能力值，以及好友
function displayResult() {
const mbtiType = calculateMBTIType();
const dessertName = typeNames[mbtiType];
const dessertDescription = typeDescriptions[mbtiType];
const abilities = typeAbilities[mbtiType];
const friends = getDessertFriends(dessertName);

// 將 MBTI 類型的結果更新到雷達圖資料中
updateRadarChartData(mbtiType);

// 啟動雷達圖
drawRadarChart();

// 將結果顯示在畫面上
const resultArea = document.getElementById('resultArea');
resultArea.innerHTML = `
  <p>MBTI 類型: ${mbtiType}</p>
  <p><strong>${dessertName}</strong>是一種具有以下特點的甜點：</p>
  <p>描述: ${dessertDescription}</p>
  <p>能力值: ${abilities.join(', ')}</p>
  <p>友好甜點: ${friends.join(', ')}</p>
`; 
}   

// 啟動測驗
  displayQuestion();
// 使用jQuery綁定下一題按鈕的點擊事件
  $("#nextButton").click(nextQuestion);
  // 使用jQuery綁定完成測驗按鈕的點擊事件
  $("#completeButton").click(displayResult);