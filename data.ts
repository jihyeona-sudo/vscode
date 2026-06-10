// National Geographic Content Data for Korean and English localization.

export interface Article {
  id: string;
  category: 'FEATURED' | 'TRAVELER' | 'KIDS';
  categoryKo: string;
  title: string;
  subtitle?: string;
  summary: string;
  image: string;
  readTime: string;
  author: string;
  date: string;
  content: string[];
}

export interface StoreItem {
  id: string;
  title: string;
  subtitle: string;
  badge?: string;
  image?: string;
  icon?: string;
  price: number;
  description: string;
  colors?: string[];
  features: string[];
}

export const articles: Article[] = [
  {
    id: 'inca-empire',
    category: 'FEATURED',
    categoryKo: 'FEATURED',
    title: '내셔널지오그래픽 매거진 6월 호',
    subtitle: '사라진 잉카 제국의 성채를 찾아서',
    summary: '안데스 산맥의 험난한 봉우리 속에 숨겨진 잃어버린 문명의 불가사의한 흔적과 역사 고고학자들의 숨막히는 탐사 보고서.',
    image: '/image/bluepants.png',
    readTime: '8 min read',
    author: '안토니오 플로레스 (Antonio Flores) 박사',
    date: '2026-06-01',
    content: [
      '안데스 산맥 해발 3,400미터, 구름과 거친 안개가 맞닿은 곳에 위치한 고대 잉카의 성채는 수세기 동안 인간의 소리로부터 단절되어 있었습니다. 1911년 하이럼 빙엄에 의해 세상에 처음 알려진 이후로도, 이 성벽 아래 잠든 무수한 진실은 여전히 미지의 베일에 가려져 있습니다.',
      '최근 새로 도입된 고해상도 초분광 LiDAR 레이더 기술을 통해, 밀림 속에 뒤덮인 채 식별되지 않았던 200여 개의 미확인 거주지 유적과 고대 계단식 농경지가 대대적으로 새롭게 복원 및 포착되었습니다. 이로써 단순한 요새가 아닌, 태양의 신들을 기리기 위한 고대의 제국 중심지였다는 학설이 강력한 설득력을 얻게 되었습니다.',
      '국립 고고학 재단과 내셔널지오그래픽 소속 탐사팀이 이끄는 현장 보존팀은 쏟아지는 우기 속에서도 돌 하나하나에 스민 마이크로 박테리아를 측정하며 당시 석공 기술자들의 정밀도에 감탄을 아끼지 않았습니다. 잉카 석조물들의 사이에는 칼날 한 장 들어갈 틈이 없다는 것은 신화가 아닌 엄연한 기하학적 역사입니다.'
    ]
  },
  {
    id: 'still-living',
    category: 'TRAVELER',
    categoryKo: 'TRAVELER',
    title: '내셔널지오그래픽 트래블러 5월호',
    subtitle: 'STILL LIVING',
    summary: '오래된 전설과 현대의 생명력이 공존하는 유럽의 숨겨진 오래된 골목과 그 안에서 쉼 없이 하루를 채워가는 예술가들의 삶.',
    image: '/image/bluepants.png',
    readTime: '6 min read',
    author: '클레어 마틴 (Claire Martin) 여행 전문 사진기자',
    date: '2026-05-15',
    content: [
      '이탈리아 로마의 좁고 가파른 옛길 골목 바깥으로 오렌지 빛 석양이 퍼지는 시간. 골목 사이를 걷는 사람들 위로 먼 과거로부터 흘러내려온 돌벽의 온도가 전해집니다. 이 골목들은 도시가 겪어온 역사와 지진, 번영과 몰락의 모든 상흔을 고스란히 안고 현재를 살아가고 있습니다.',
      'STILL LIVING - 여전히 살아 숨 쉬는 역사. 300년이 넘은 나무 대문 안쪽 작업실에서는 젊은 가죽 장인들이 옛 방식 그대로 칼을 움직이고 있고, 오래된 선술집에서는 할아버지가 만든 포도주를 그들의 손자들이 컵에 채웁니다. 여행자들의 발걸음은 이러한 일상의 한 단면 속으로 천천히 흘러들어갑니다.',
      '우리가 역사 유적지에서 느끼는 경이로움은 결코 얼어붙어 있는 박물관의 돌조각 때문이 아닙니다. 그것은 시간의 흐름 속에서도 도태되지 않고 여전히 사람들의 대화와 웃음소리로 맥동하는 살아있는 인간 생활의 생생한 흔적 때문입니다.'
    ]
  },
  {
    id: 'tiger-stripes',
    category: 'KIDS',
    categoryKo: 'KIDS',
    title: '키즈 매거진 6/7월호',
    subtitle: '줄무늬가 바뀐 호랑이들',
    summary: '자연계에서 가장 카리스마 넘치는 포식자인 호랑이들의 위장 무늬 속에 숨은 유전학의 비밀과 미래 환경 속 변화 탐구.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV3vWK-vxBv8cGIYmWd-69-aX3Y-jDHkjcgHUo1y4X87482hcF3Ht99jdFbBaS8vWpsgb1r2Kz1SWKRXnUjBTC5e_l3MWYvDOSq4xCFgMzZ5QALIGgl8wGNzQ5koPjmjNoqjMg0FYwlRmIWCDDq9LzqTstyA99CB98PQlLeTKb_W1Jxbd65HNNqsYPINlN7bnr1UAJ3O2q7iNotpk1n1kKl20DKHAtBgNqYKMfxXgWb456bE065VNC05RrAoHEVYx5CJxEy5__kAGi',
    readTime: '4 min read',
    author: '사만다 리 (Samantha Lee) 아동 생태학자',
    date: '2026-06-05',
    content: [
      '안녕, 어린이 탐험가 친구들! 숲속에서 가장 강력하고 위엄 있는 줄무늬 왕, 호랑이의 옷에 무슨 일이 일어난 걸까요? 호랑이의 주황빛 털 위에 새겨진 검은색 줄무늬는 하나하나가 마치 사람의 지문처럼 지구상에 단 하나밖에 없는 특별한 무늬예요.',
      '오늘날 과학자들은 왜 호랑이들마다 미세하게 줄무늬 두께나 모양이 다른지 연구하고 있어요. 숲이 우거지고 햇빛이 나뭇잎 틈사이로 화살처럼 쏟아지는 정글 속에서는, 미세하고 촘촘한 줄무늬가 호랑이의 커다란 덩치를 완벽하게 숨겨주는 최고의 그림자 보호막이 된답니다.',
      '우리가 살고 있는 환경이 달라짐에 따라 야생 호랑이들이 사냥을 더 잘하기 위해 무늬 패턴을 진화적으로 바꾸거나 적응시킬 수 있을까요? 만약 호랑이의 줄무늬가 가로에서 세로로, 혹은 파도모양으로 변한다면 정글 속 동물들은 과연 호랑이를 알아챌 수 있을지 함께 수수께끼를 풀어봐요!'
    ]
  }
];

export const storeItems: StoreItem[] = [
  {
    id: 'ng-apparel',
    title: '내셔널지오그래픽 어패럴',
    subtitle: '26 Summer NRN 코튼 티셔츠',
    badge: 'NEW',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBl74CN6X6MKCj-2N-wWo61Yw2VLMhjNDYZkt3mGLWLY87i444LZ3HsfmMUdRaqQekCvNMG5vIftYL5cl7wFXIdHQB4NqMS9Isegk9JKZfJhHKzLvRA4cV6-Juv-Bx1-xHChbow0NEZXo_gwNS65KGGQQjUhLfWkJvwEEcFbGxF0dVnnkbbCMUUwhT2O7J348zvuE4mICHylyFDbq60XwuFCsxaBX8aMl19si7nuWjiBpM2BuGB3SbxnbU69a4BlxOiJPHOk_072B7Y',
    price: 49000,
    description: '어떤 기후 속 탐사 과정에서도 자연 친화적 쾌적함을 유지하도록 엄선된 오가닉 바이오 코튼 100% 티셔츠 기획전. 부드러운 아웃도어 가슴 포켓 디테일과 견고한 넥라인 마감을 적용하여 오래 입어도 형태 변형이 적습니다.',
    colors: ['Sage Green', 'Midnight Ink', 'Sahara Sand'],
    features: ['오가닉 순면 100% 천연 소재', '가슴 수납 포켓 및 옐로우 실드 라벨', '땀 흡수 및 열 배출 통기 가공']
  },
  {
    id: 'mag-battery',
    title: '마그네틱 보조배터리',
    subtitle: '10,000mAh 맥세이프 무선 충전기',
    icon: 'battery_charging_full',
    price: 39000,
    description: '배터리 충전 걱정 없는 완벽한 아웃도어 주행을 위한 고집적 마그네틱 팩. 초슬림 설계와 마그네틱 자력을 통해 탐사 도중 흔들림 없이 밀착하여 안정적인 고무선 충전 출력을 지속적으로 지원합니다.',
    colors: ['Titanium Gray', 'Carbon Matte Black'],
    features: ['10000mAh 하이 데피니션 리튬 폴리머', '최대 15W 맥세이프 무선 고속 충전', '동시 듀얼 유무선 출력 포트']
  },
  {
    id: 'action-cam',
    title: '액션 캠',
    subtitle: '스마트 지로 모션 4K 고프로 액션 캠',
    icon: 'videocam',
    price: 389000,
    description: '격동적인 모험의 매 순간을 4K Ultra HD 화질의 부드러운 타임랩스와 익스트림 고감도 기로 안정화 기술로 온전히 기록하세요. 수심 20m 자가 방수 성능을 기본 탑재하여 어떤 극한 환경도 이겨냅니다.',
    colors: ['Abyss Yellow Accent', 'Tactical Charcoal Black'],
    features: ['4K UHD 60fps 오토 다이내믹 포커스', '2.0인치 인터랙티브 듀얼 터치 디스플레이', '6축 전방향 전자식 흔들림 보정(EIS)']
  }
];
