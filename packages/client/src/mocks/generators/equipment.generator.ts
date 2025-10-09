/**
 * Description : equipment.generator.ts - 📌 장비/디바이스 데이터 생성기
 * Author : Shiwoo Min
 * Date : 2025-10-09
 */
import { faker } from '@faker-js/faker/locale/ko';
import type {
  Equipment,
  EquipmentRental,
  EquipmentCategory,
} from '../../mock-types.js';

// 장비 생성기
export function generateEquipment(override: Partial<Equipment> = {}): Equipment {
  const category = faker.helpers.arrayElement([
    'notebook',
    'tablet',
    'monitor',
    'charger',
    'microphone',
    'speaker',
    'webcam',
    'projector',
    'hdmi-cable',
    'whiteboard',
    'mouse',
    'keyboard',
    'tripod',
    'adapter',
    'usb-hub',
    'remote',
    'lighting',
  ] as const);

  const info = getEquipmentDataByCategory(category);

  return {
    id: faker.string.uuid(),
    name: info.name,
    type: info.type,
    category,
    description: info.description,
    status: faker.helpers.arrayElement(['AVAILABLE', 'AVAILABLE', 'IN_USE', 'MAINTENANCE']),
    condition: faker.helpers.arrayElement(['excellent', 'good', 'good', 'fair']),
    venueId: faker.number.int({ min: 1, max: 5 }),
    roomId: Math.random() > 0.7 ? faker.number.int({ min: 1, max: 30 }) : undefined,
    quantity: faker.number.int({ min: 1, max: 20 }),
    availableQuantity: faker.number.int({ min: 0, max: 10 }),
    imageUrl: faker.image.urlPicsumPhotos({ width: 400, height: 300 }),
    location: faker.helpers.arrayElement(['회의실', '라운지', '창고', '오픈데스크']),
    lastCheckedAt: faker.date.recent({ days: 60 }).toISOString(),
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...override,
  };
}

// 카테고리별 예시 데이터
function getEquipmentDataByCategory(category: EquipmentCategory) {
  const map: Record<EquipmentCategory, any> = {
    notebook: {
      name: faker.helpers.arrayElement(['MacBook Air', 'LG Gram', 'Galaxy Book', 'ThinkPad']),
      type: '공유장비',
      description: '공용 노트북. 회의나 발표용으로 사용 가능.',
    },
    tablet: {
      name: faker.helpers.arrayElement(['iPad Pro', 'Galaxy Tab S9', 'Surface Go']),
      type: '공유장비',
      description: '필기나 회의용 디지털 태블릿.',
    },
    monitor: {
      name: faker.helpers.arrayElement(['LG 27UP850', 'Dell U2723DE', 'BenQ PD2705Q']),
      type: '사무기기',
      description: '회의실용 보조 모니터.',
    },
    charger: {
      name: faker.helpers.arrayElement(['USB-C 충전기', '멀티탭', '노트북 전원 어댑터']),
      type: '충전기기',
      description: '공용 전원 어댑터 및 충전 케이블.',
    },
    microphone: {
      name: faker.helpers.arrayElement(['Shure MV7', 'Rode NT-USB', 'Blue Snowball']),
      type: '음향장비',
      description: '발표 및 화상회의용 마이크.',
    },
    speaker: {
      name: faker.helpers.arrayElement(['JBL Charge 5', 'Sony SRS-XB33', 'Bose SoundLink']),
      type: '음향장비',
      description: '회의실 또는 소규모 이벤트용 스피커.',
    },
    webcam: {
      name: faker.helpers.arrayElement(['Logitech C920', 'Elgato Facecam', 'Razer Kiyo']),
      type: '영상장비',
      description: '화상회의용 고화질 웹캠.',
    },
    projector: {
      name: faker.helpers.arrayElement(['BenQ GV30', 'LG PF610P', 'ViewSonic M2e']),
      type: '영상장비',
      description: '회의실용 미니 프로젝터.',
    },
    'hdmi-cable': {
      name: 'HDMI 케이블',
      type: '회의비품',
      description: '프로젝터/모니터 연결용 HDMI 케이블.',
    },
    whiteboard: {
      name: '화이트보드',
      type: '회의비품',
      description: '아이디어 공유용 화이트보드.',
    },
    mouse: {
      name: faker.helpers.arrayElement(['Logitech MX Master', 'Apple Magic Mouse', 'MS Bluetooth Mouse']),
      type: '사무기기',
      description: '공용 마우스.',
    },
    keyboard: {
      name: faker.helpers.arrayElement(['Keychron K8', 'Logitech MX Keys', 'Apple Magic Keyboard']),
      type: '사무기기',
      description: '공용 키보드.',
    },
    tripod: {
      name: '카메라 삼각대',
      type: '영상장비',
      description: '촬영 및 스트리밍용 삼각대.',
    },
    adapter: {
      name: 'HDMI/USB-C 어댑터',
      type: '충전기기',
      description: '디바이스 연결용 변환 어댑터.',
    },
    'usb-hub': {
      name: 'USB 허브 (4포트)',
      type: '사무기기',
      description: '다중 장치 연결용 USB 허브.',
    },
    remote: {
      name: '프리젠터 리모컨',
      type: '회의비품',
      description: '발표용 무선 리모컨.',
    },
    lighting: {
      name: faker.helpers.arrayElement(['Ring Light', 'LED Desk Lamp', '조명 패널']),
      type: '영상장비',
      description: '촬영 및 조명 보조 장비.',
    },
  };

  return map[category];
}

// 장비 대여 생성기
export function generateEquipmentRental(override: Partial<EquipmentRental> = {}): EquipmentRental {
  const startsAt = faker.date.future();
  const endsAt = new Date(startsAt.getTime() + faker.number.int({ min: 1, max: 3 }) * 60 * 60 * 1000);
  const status = faker.helpers.arrayElement(['PENDING', 'APPROVED', 'IN_USE', 'RETURNED', 'CANCELLED', 'OVERDUE']);

  const isReturned = status === 'RETURNED';

  return {
    id: faker.string.uuid(),
    equipmentId: faker.string.uuid(),
    equipmentName: faker.helpers.arrayElement([
      'MacBook Air',
      'USB-C 충전기',
      'BenQ 미니 프로젝터',
      '화이트보드',
      'JBL 블루투스 스피커',
    ]),
    userId: faker.number.int({ min: 1, max: 999 }),
    userName: faker.person.fullName(),
    startsAt: startsAt.toISOString(),
    endsAt: endsAt.toISOString(),
    status,
    purpose: faker.helpers.arrayElement(['회의 발표', '워크샵', '영상 촬영', '스터디 모임']),
    notes: Math.random() > 0.7 ? faker.lorem.sentence() : undefined,
    conditionAtRental: faker.helpers.arrayElement(['excellent', 'good', 'good', 'fair']),
    conditionAtReturn: isReturned
      ? faker.helpers.arrayElement(['excellent', 'good', 'fair'])
      : undefined,
    returnedAt: isReturned ? faker.date.recent().toISOString() : undefined,
    createdAt: faker.date.past().toISOString(),
    updatedAt: faker.date.recent().toISOString(),
    ...override,
  } satisfies EquipmentRental;
}

// 장비 현황 생성기
export function generateEquipmentInventory(venueId: number) {
  const categories: EquipmentCategory[] = [
    'notebook',
    'tablet',
    'monitor',
    'projector',
    'microphone',
    'speaker',
    'charger',
    'adapter',
    'whiteboard',
  ];

  return categories.map(category => ({
    category,
    total: faker.number.int({ min: 2, max: 15 }),
    available: faker.number.int({ min: 1, max: 10 }),
    inUse: faker.number.int({ min: 0, max: 5 }),
    maintenance: faker.number.int({ min: 0, max: 2 }),
    venueId,
  }));
}
