// 最高學歷
export const educationLevelList = [
  {
    text: '國小',
    value: 0,
  },
  {
    text: '國中',
    value: 1,
  },
  {
    text: '高中',
    value: 2,
  },
  {
    text: '礦場作業相關初級工業職業學校',
    value: 3,
  },
  {
    text: '礦場作業相關高級工業職業學校',
    value: 4,
  },
  {
    text: '專科以上學校相關科系',
    value: 5,
  },
  {
    text: '專科以上學校非相關科系',
    value: 6,
  },
  {
    text: '其他',
    value: 7,
  },
]

// 人員註記
export const personStatusList = [
  {
    text: '無',
    value: 0,
  },
  {
    text: '原住民',
    value: 1,
  },
  {
    text: '外籍人士',
    value: 2,
  },
]

// 職稱
export const positionTitleList = [
  { text: '礦場負責人', value: 0 }, // Principal
  { text: '礦場安全主管', value: 1 }, // SafeSupervisor
  { text: '安全管理員', value: 2 }, // SafeManager
  { text: '通風管理員', value: 3 }, // VentilationManager
  { text: '坑內安全督察員', value: 4 }, // InPitSafeInspector
  { text: '坑外安全督察員', value: 5 }, // OutPitSafeInspector
  { text: '機電安全督察員', value: 6 }, // ElectromechanicalSafeInspector
  { text: '作業人員', value: 7 }, // Operator * 當選擇這個職稱時，可以選擇職別
  { text: '救護隊長', value: 8 }, // AmbulanceCaptain
  { text: '救護隊整備員', value: 9 }, // AmbulanceMaintener
  { text: '救護隊事務員', value: 10 }, // AmbulanceAssistant
  { text: '救護班長', value: 11 }, // AmbulanceSquadLeader
  { text: '救護班員', value: 12 }, // AmbulanceSquadMember
  { text: '消防班長', value: 13 }, // FireSquadLeader
  { text: '消防班員', value: 14 }, // FireSquadMember
  { text: '工程搶修班長', value: 15 }, // EmergencyRepairSquadLeader
  { text: '工程搶修班員', value: 16 }, // EmergencyRepairSquadMember
  { text: '爆破專業人員', value: 17 }, // ExplosiveExpert
  { text: '爆炸物管理員', value: 18 }, // ExplosiveManager
]
// 礦場類別
export const mineTypeList = [
  {
    text: '地下礦場', // UnderGround
    value: 0,
    positionClassList: [
      { text: '電機設備之裝設、保養及修理人員', value: 0 },
      { text: '電機設備之裝設、保養及修理人員', value: 1 },
      { text: '壓風機、抽水機、扇風機操作人員', value: 2 },
      { text: '押車作業人員', value: 3 },
      { text: '機車駕駛及保養人員', value: 4 },
      { text: '爆破作業人員', value: 5 },
      { text: '其他坑內作業人員', value: 6 },
    ],
  },
  {
    text: '露天礦場', // OpenPit
    value: 1,
    positionClassList: [
      { text: '採礦機械設備之裝設、操作、保養及修理人員', value: 0 },
      { text: '鏟裝機械設備之裝設、操作、保養及修理人員', value: 1 },
      { text: '搬運機械設備之裝設、操作、保養及修理人員', value: 2 },
      { text: '電機與機械設備之裝設、操作、保養及修理人員', value: 3 },
      { text: '爆破作業人員', value: 4 },
      { text: '其他作業人員', value: 5 },
    ],
  },
  {
    text: '石油與天然氣礦場', // OilAndGas
    value: 2,
    positionClassList: [
      { text: '測勘作業人員', value: 0 },
      { text: '鑽井作業人員', value: 1 },
      { text: '油氣生產作業人員', value: 2 },
      { text: '油氣處理作業人員', value: 3 },
      { text: '機械作業人員', value: 4 },
      { text: '電機作業人員', value: 5 },
      { text: '其他作業人員', value: 6 },
    ],
  },
  {
    text: '地下礦場（煤礦）', // UnderGroundCoal
    value: 3,
    positionClassList: [
      { text: '電機設備之裝設、保養及修理人員', value: 0 },
      { text: '電機設備之裝設、保養及修理人員', value: 1 },
      { text: '壓風機、抽水機、扇風機操作人員', value: 2 },
      { text: '押車作業人員', value: 3 },
      { text: '機車駕駛及保養人員', value: 4 },
      { text: '爆破作業人員', value: 5 },
      { text: '其他坑內作業人員', value: 6 },
    ],
  },
  {
    text: '地下礦場（煤礦以外礦場）', // UnderGroundNotCoal
    value: 4,
    positionClassList: [
      { text: '電機設備之裝設、保養及修理人員', value: 0 },
      { text: '電機設備之裝設、保養及修理人員', value: 1 },
      { text: '壓風機、抽水機、扇風機操作人員', value: 2 },
      { text: '押車作業人員', value: 3 },
      { text: '機車駕駛及保養人員', value: 4 },
      { text: '爆破作業人員', value: 5 },
      { text: '其他坑內作業人員', value: 6 },
    ],
  },
]

// 訓練課程類別
export const positionTrainingList = [
  {
    text: '作業人員在職訓練',
    value: 0,
    mineTypeList: [
      {
        text: '地下礦場',
        value: 0,
        trainingList: [
          { text: '電機設備之裝設、保養及修理人員-在職訓練', value: 0 },
          { text: '捲揚機操作人員-在職訓練', value: 1 },
          { text: '壓風機、抽水機、扇風機操作人員-在職訓練', value: 2 },
          { text: '押車作業人員-在職訓練', value: 3 },
          { text: '機車駕駛及保養人員-在職訓練', value: 4 },
          { text: '爆破作業人員-在職訓練', value: 5 },
          { text: '其他坑內作業人員-在職訓練    ', value: 6 },
          { text: '坑外作業人員-在職訓練', value: 7 },
        ],
      },
      {
        text: '露天礦場',
        value: 1,
        trainingList: [
          {
            text: '採礦機械設備之裝設、操作、保養及修理人員-在職訓練',
            value: 0,
          },
          {
            text: '鏟裝機械設備之裝設、操作、保養及修理人員-在職訓練',
            value: 1,
          },
          {
            text: '搬運機械設備之裝設、操作、保養及修理人員-在職訓練',
            value: 2,
          },
          {
            text: '電機與機械設備之裝設、操作、保養及修理人員-在職訓練',
            value: 3,
          },
          { text: '爆破作業人員-在職訓練', value: 4 },
          { text: '其他作業人員-在職訓練', value: 5 },
        ],
      },
      {
        text: '石油天然氣礦場',
        value: 2,
        trainingList: [
          { text: '測勘作業人員-在職訓練', value: 0 },
          { text: '鑽井作業人員-在職訓練', value: 1 },
          { text: '油氣生產作業人員-在職訓練', value: 2 },
          { text: '油氣處理作業人員-在職訓練', value: 3 },
          { text: '機械作業人員-在職訓練', value: 4 },
          { text: '電機作業人員-在職訓練', value: 5 },
          { text: '爆破作業人員-在職訓練', value: 6 },
          { text: '其他作業人員-在職訓練', value: 7 },
        ],
      },
    ],
  },
  {
    text: '作業人員職前訓練',
    value: 1,
    mineTypeList: [
      {
        text: '地下礦場',
        value: 0,
        trainingList: [
          { text: '電機設備之裝設、保養及修理人員-職前訓練', value: 0 },
          { text: '捲揚機操作人員-職前訓練', value: 1 },
          { text: '壓風機、抽水機、扇風機操作人員-職前訓練', value: 2 },
          { text: '押車作業人員-職前訓練', value: 3 },
          { text: '機車駕駛及保養人員-職前訓練', value: 4 },
          { text: '爆破作業人員-職前訓練', value: 5 },
          { text: '其他坑內作業人員-職前訓練', value: 6 },
          { text: '坑外作業人員-職前訓練', value: 7 },
        ],
      },
      {
        text: '露天礦場',
        value: 1,
        trainingList: [
          {
            text: '採礦機械設備之裝設、操作、保養及修理人員-職前訓練',
            value: 0,
          },
          {
            text: '鏟裝機械設備之裝設、操作、保養及修理人員-職前訓練',
            value: 1,
          },
          {
            text: '搬運機械設備之裝設、操作、保養及修理人員-職前訓練',
            value: 2,
          },
          {
            text: '電機與機械設備之裝設、操作、保養及修理人員-職前訓練',
            value: 3,
          },
          { text: '爆破作業人員-職前訓練', value: 4 },
          { text: '其他作業人員-職前訓練', value: 5 },
        ],
      },
      {
        text: '石油天然氣礦場',
        value: 2,
        trainingList: [
          { text: '測勘作業人員-職前訓練', value: 0 },
          { text: '鑽井作業人員-職前訓練', value: 1 },
          { text: '油氣生產作業人員-職前訓練', value: 2 },
          { text: '油氣處理作業人員-職前訓練', value: 3 },
          { text: '機械作業人員-職前訓練', value: 4 },
          { text: '電機作業人員-職前訓練', value: 5 },
          { text: '爆破作業人員-職前訓練', value: 6 },
          { text: '其他作業人員-職前訓練', value: 7 },
        ],
      },
    ],
  },
  {
    text: '在職救護隊訓練',
    value: 2,
    mineTypeList: [
      {
        text: '地下礦場',
        value: 0,
        trainingList: [
          { text: '地下礦場(煤礦場)-在職救護隊訓練', value: 0 },
          { text: '地下礦場(煤以外礦場)-在職救護隊訓練', value: 1 },
        ],
      },
      {
        text: '露天礦場',
        value: 1,
        trainingList: [{ text: '露天礦場-在職救護隊訓練', value: 1 }],
      },
      {
        text: '石油天然氣礦場',
        value: 2,
        trainingList: [{ text: '石油、天然氣礦場-在職救護隊訓練', value: 1 }],
      },
    ],
  },
  {
    text: '新任救護隊訓練',
    value: 3,
    mineTypeList: [
      {
        text: '地下礦場',
        value: 0,
        trainingList: [
          { text: '地下礦場(煤礦場)-新任救護隊訓練', value: 0 },
          { text: '地下礦場(煤以外礦場)-新任救護隊訓練', value: 1 },
        ],
      },
      {
        text: '露天礦場',
        value: 1,
        trainingList: [{ text: '露天礦場-新任救護隊訓練', value: 1 }],
      },
      {
        text: '石油天然氣礦場',
        value: 2,
        trainingList: [{ text: '石油、天然氣礦場-新任救護隊訓練', value: 1 }],
      },
    ],
  },
  {
    text: '作業人員調訓',
    value: 4,
    mineTypeList: [
      {
        text: '地下礦場',
        value: 0,
        trainingList: [{ text: '作業人員調訓', value: 0 }],
      },
      {
        text: '露天礦場',
        value: 1,
        trainingList: [{ text: '作業人員調訓', value: 1 }],
      },
      {
        text: '石油天然氣礦場',
        value: 2,
        trainingList: [{ text: '作業人員調訓', value: 1 }],
      },
    ],
  },
]

// 期次
export const periodList = [
  { text: '不分期', value: 0 },
  { text: '上期', value: 1 },
  { text: '下期', value: 2 },
  { text: '自訂期次', value: 3 }, // 3: 自訂期次 1, 4: 自訂期次 2, 5: 自訂期次 3 依此類推
]

// 資格類別
export const qualificationCategoryList = [
  { text: '礦場安全管理員', value: 0 }, // SafeManager
  { text: '礦場安全管理員', value: 1 }, // (石油及天然氣礦場) SafeManagerOilAndGas
  { text: '礦場通風管理員', value: 2 }, // VentilationManager
  { text: '礦場坑內安全督察員', value: 3 }, // InPitSafeInspector
  { text: '礦場坑外安全督察員', value: 4 }, // OutPitSafeInspector
  { text: '礦場機電安全督察員', value: 5 }, // ElectromechanicalSafeInspector
  { text: '礦場安全督察員', value: 6 }, // SafeInspector
  { text: '其他', value: 7 }, // Other
]

// 職務屬性 - 獎懲種類及額度
export const jobAttrTypeList = [
  {
    text: '礦場負責人',
    value: 0,
    rewardTypeList: [{ text: '變更', value: 0 }],
  }, // 礦場負責人 Principal
  {
    text: '礦場安全管理員',
    value: 1,
    rewardTypeList: [
      { text: '獎勵', value: 0 },
      { text: '警告', value: 1 },
      { text: '變更', value: 2 },
    ],
  }, // 礦場安全管理員 SafeManager
  {
    text: '礦場通風管理員',
    value: 2,
    rewardTypeList: [
      { text: '獎勵', value: 0 },
      { text: '警告', value: 1 },
      { text: '變更', value: 2 },
    ],
  }, // 礦場通風管理員 VentilationManager
  {
    text: '礦場坑內安全督察員',
    value: 3,
    rewardTypeList: [
      { text: '獎勵', value: 0 },
      { text: '警告', value: 1 },
      { text: '變更', value: 2 },
    ],
  }, // 礦場坑內安全督察員InPitSafeInspector}
  {
    text: '礦場坑外安全督察員',
    value: 4,
    rewardTypeList: [
      { text: '獎勵', value: 0 },
      { text: '警告', value: 1 },
      { text: '變更', value: 2 },
    ],
  }, // 礦場坑外安全督察員OutPitSafeInspector}
  {
    text: '礦場機電安全督察員',
    value: 5,
    rewardTypeList: [
      { text: '獎勵', value: 0 },
      { text: '警告', value: 1 },
      { text: '變更', value: 2 },
    ],
  }, // 礦場機電安全督察員ElectromechanicalSafeInspector}
  {
    text: '爆炸物管理員',
    value: 6,
    rewardTypeList: [
      { text: '獎勵', value: 0 },
      { text: '警告1次', value: 1 },
      { text: '警告2次', value: 2 },
      { text: '廢證終身', value: 3 },
      { text: '廢證1年', value: 4 },
      { text: '廢證3年', value: 5 },
    ],
  }, // 爆炸物管理員 ExplosiveManager
  {
    text: '爆破專業人員',
    value: 7,
    rewardTypeList: [
      { text: '獎勵', value: 0 },
      { text: '警告1次', value: 1 },
      { text: '警告2次', value: 2 },
      { text: '廢證終身', value: 3 },
      { text: '廢證1年', value: 4 },
      { text: '廢證3年', value: 5 },
    ],
  }, // 爆破專業人員 ExplosiveExpert
]

export const legalBasisTypeList = [
  { text: '法令依據1', value: 0 },
  { text: '法令依據2', value: 1 },
  { text: '法令依據3', value: 2 },
  { text: '法令依據4', value: 3 },
  { text: '法令依據5', value: 4 },
]
