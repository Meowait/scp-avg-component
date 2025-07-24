const gameContainer = document.getElementById('game-container');
const speakerNameElement = document.getElementById('speaker-name');
const dialogueTextElement = document.getElementById('dialogue-text');
const backgroundElement = document.getElementById('background');

// 角色立绘容器
const characterSpritesContainer = document.getElementById('character-sprites-container');

// 获取所有角色立绘的HTML元素，并创建一个映射方便查找
const characterSprites = {
    'charA': document.getElementById('charA_sprite'), // 克莱尔
    'charB': document.getElementById('charB_sprite'), // 症候
    // 如果有更多角色，在这里添加 'charC': document.getElementById('charC_sprite'),
};

const historyButton = document.getElementById('history-button');
const resetButton = document.getElementById('reset-button');
const historyPanel = document.getElementById('history-panel');
const historyContent = document.getElementById('history-content');
const closeHistoryButton = document.getElementById('close-history-button');

// 原始对话内容数组
// 图片链接已更新为您提供的链接，角色ID为 charA 和 charB
const originalDialogues = [
    {
        speaker: "旁白",
        text: "“黑色梦中”——意识的废墟，逻辑的边界。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: [],
        speakingCharacter: ''
    },
    {
        speaker: "克莱尔",
        text: "（环顾四周，眼中带着困惑）这里是…时间的墓碑吗？我感到了某种深沉的，无法解读的脉动。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA'], // 克莱尔 (charA) 登场
        speakingCharacter: 'charA'
    },
    {
        speaker: "症候",
        text: "啊，你感知到了。不是墓碑，克莱尔。这里是拟像的子宫。所有的“真实”都在这里被重新编织，直到你分不清它们最初的形貌。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'], // 克莱尔 (charA) 和瓦伦丁 (charB) 都在场
        speakingCharacter: 'charB' // 瓦伦丁 (charB) 说话
    },
    {
        speaker: "克莱尔",
        text: "拟像…子宫？你能不能收一收你的恋词癖。那些仪式痕迹…那化石成功孕育了吗？",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charA' // 克莱尔 (charA) 说话
    },
    {
        speaker: "症候",
        text: "它们在回溯，回溯至源初的混沌，回溯至深红色的张力。冥婚婚约只是个幌子，这是业的缠结。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charB'
    },
    {
        speaker: "克莱尔",
        text: "业的缠结？你是说某种宿命论吗？它们自破壳的一刻命运就已经注定了吗？",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charA'
    },
    {
        speaker: "症候",
        text: "命运这个词汇太过浅薄，这更像是一种控制论层面的联系。它们是地球深处的集体潜意识，被提炼，被编码，然后，被消费。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charB'
    },
    {
        speaker: "克莱尔",
        text: "消费？你在说什么？集体潜意识还能被消费？这太荒谬了！",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charA'
    },
    {
        speaker: "症候",
        text: "荒谬？荒谬是资本主义现实的最后一层帷幕。我们呼吸的，我们驾驶的，我们点燃的——那都是它们油炸后的血肉，被工业的齿轮研磨，成为驱动你日常的祭品。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charB'
    },
    {
        speaker: "克莱尔",
        text: "这一切难道都只是一场黑色幽默的行为艺术？",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charA'
    },
    {
        speaker: "症候",
        text: "正是。你试图寻找意义，但最终只能迷失在无固定意义的符号矩阵中。每个连接，都通向另一个连接，但核心的虚无却永恒不变。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charB'
    },
    {
        speaker: "旁白",
        text: "巨大的恐龙化石，并未试图说服那些迷失在拟像之网中的人们。它只是将同胞的尸骨——石油，默默地泼洒在自己身上。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'], // 角色可能呆滞地在场
        speakingCharacter: ''
    },
    {
        speaker: "旁白",
        text: "然后，它扑向了火。缘起性空的寂灭，只为完成那个被设定好的，无限重复的深红色张力循环。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: ''
    },
    {
        speaker: "症候",
        text: "你看，克莱尔。现实即恐怖，拟像亦恐怖。业即恐怖，缘起即恐怖。所有的分类都在崩塌，只剩下最纯粹的混沌。",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charB'
    },
    {
        speaker: "克莱尔",
        text: "（眼神空洞，喃喃自语）混沌…",
        backgroundImage: 'https://scpsandboxcn.wikidot.com/local--files/meowait/dinosaur-background',
        onScreenCharacters: ['charA', 'charB'],
        speakingCharacter: 'charA'
    },
    {
        speaker: "旁白",
        text: "故事结束。点击任意处或重置按钮重新开始。",
        onScreenCharacters: [],
        speakingCharacter: ''
    }
];

let dialogues = [...originalDialogues];
let dialogueIndex = 0;
let dialogueHistory = [];

/**
 * 更新所有角色立绘的状态（显示/隐藏，活跃/非活跃）。
 * @param {Array<string>} onScreenChars - 当前在屏幕上的角色ID数组。
 * @param {string} speakingChar - 当前正在说话的角色ID。
 */
function updateCharacterSprites(onScreenChars, speakingChar) {
    // 遍历所有已知的角色立绘
    for (const charId in characterSprites) {
        const spriteElement = characterSprites[charId];
        
        // 检查角色是否应该在屏幕上
        if (onScreenChars.includes(charId)) {
            // 移除所有状态类
            spriteElement.classList.remove('active-character', 'dimmed-character');

            // 根据是否是说话角色来添加类
            if (charId === speakingChar) {
                spriteElement.classList.add('active-character'); // 说话角色：完全显示，变亮
            } else {
                spriteElement.classList.add('dimmed-character'); // 非说话角色：半透明
            }
            spriteElement.style.display = 'block'; // 确保显示
        } else {
            // 角色不在屏幕上，隐藏它
            spriteElement.classList.remove('active-character', 'dimmed-character');
            spriteElement.style.display = 'none'; // 隐藏元素
        }
    }
}


/**
 * 显示当前对话并推进游戏进度。
 */
function showDialogue() {
    if (historyPanel.style.display === 'flex') {
        return;
    }

    if (dialogueIndex >= dialogues.length) {
        speakerNameElement.textContent = "旁白";
        dialogueTextElement.textContent = "故事结束。点击任意处或重置按钮重新开始";
        updateCharacterSprites([], ''); // 隐藏所有角色
        return;
    }

    const currentDialogue = dialogues[dialogueIndex];

    // 更新背景图片
    if (currentDialogue.backgroundImage) {
        backgroundElement.style.backgroundImage = `url('${currentDialogue.backgroundImage}')`;
    }

    // 更新角色立绘状态（显示、隐藏、活跃、非活跃）
    updateCharacterSprites(currentDialogue.onScreenCharacters, currentDialogue.speakingCharacter);

    speakerNameElement.textContent = currentDialogue.speaker;
    dialogueTextElement.textContent = currentDialogue.text;

    dialogueHistory.push({
        speaker: currentDialogue.speaker,
        text: currentDialogue.text
    });

    dialogueIndex++;
}

/**
 * 切换历史记录面板的显示/隐藏状态。
 */
function toggleHistory() {
    if (historyPanel.style.display === 'flex') {
        historyPanel.style.display = 'none';
    } else {
        historyPanel.style.display = 'flex';
        renderHistory();
    }
}

/**
 * 渲染并显示对话历史记录到历史面板中。
 */
function renderHistory() {
    historyContent.innerHTML = '';

    dialogueHistory.forEach(entry => {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${entry.speaker}：</strong> ${entry.text}`;
        historyContent.appendChild(p);
    });

    historyContent.scrollTop = historyContent.scrollHeight;
}

/**
 * 重置游戏到初始状态。
 */
function resetGame() {
    if (confirm("確定要重置遊戲嗎？所有進度將會丟失。")) {
        dialogueIndex = 0;
        dialogueHistory = [];
        dialogues = [...originalDialogues];
        historyPanel.style.display = 'none';
        showDialogue(); // 从第一句对话开始
    }
}

// --- 事件监听器 ---

gameContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target.closest('#history-button') ||
        target.closest('#reset-button') ||
        target.closest('#close-history-button') ||
        target.closest('#history-panel')) {
        event.stopPropagation();
        return;
    }
    if (historyPanel.style.display === 'flex') {
        return;
    }
    showDialogue();
});

historyButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleHistory();
});

closeHistoryButton.addEventListener('click', (event) => {
    event.stopPropagation();
    toggleHistory();
});

resetButton.addEventListener('click', (event) => {
    event.stopPropagation();
    resetGame();
});

// --- 游戏初始化 ---

// 页面加载后，立即显示第一句对话
showDialogue();