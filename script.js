// 1. 🚨🚨 여기에 사용자님의 Firebase 설정 정보를 붙여넣으세요 🚨🚨
// (Firebase 콘솔 > 프로젝트 설정 > 일반 > '내 앱'에서 찾을 수 있습니다)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 2. Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);
// Firestore (데이터베이스) 서비스 초기화
const db = firebase.firestore();


// 3. HTML 요소들을 JavaScript 변수로 가져오기
const registerButton = document.getElementById('registerButton');
const partySizeInput = document.getElementById('partySizeInput');
const statusMessage = document.getElementById('statusMessage');

// 4. "등록하기" 버튼 클릭 이벤트 설정
registerButton.addEventListener('click', async () => {
    
    // 5. 입력된 인원수 가져오기
    const partySize = parseInt(partySizeInput.value, 10);

    // 6. 유효성 검사
    if (isNaN(partySize) || partySize < 1) {
        statusMessage.textContent = "인원수를 정확히 입력해 주세요.";
        statusMessage.style.color = "red";
        return;
    }

    // 7. URL에서 가게 ID 가져오기 (예: ...?store=store_123)
    const storeId = getStoreIdFromUrl();
    if (!storeId) {
        statusMessage.textContent = "가게 정보를 찾을 수 없습니다. (QR코드가 잘못됨)";
        statusMessage.style.color = "red";
        return;
    }

    try {
        // 8. Firebase DB에 데이터 쓰기 (가장 핵심!)
        // 'stores' 컬렉션 > (가게ID) 문서 > 'waitingList' 하위 컬렉션에 새 문서 추가
        const docRef = await db.collection('stores').doc(storeId).collection('waitingList').add({
            size: partySize,          // 인원수
            status: "waiting",        // 현재 상태 (대기중)
            timestamp: new Date()     // 등록 시간 (서버 시간 기준)
        });

        // 9. 등록 성공
        statusMessage.textContent = `등록 완료! (대기번호: ${docRef.id.substring(0, 6)})`; // 간단한 대기번호 표시
        statusMessage.style.color = "green";
        registerButton.disabled = true; // 중복 등록 방지
        partySizeInput.disabled = true;

    } catch (error) {
        // 10. 등록 실패
        console.error("Error adding document: ", error);
        statusMessage.textContent = "등록에 실패했습니다. 다시 시도해 주세요.";
        statusMessage.style.color = "red";
    }
});


/**
 * 헬퍼 함수: URL의 쿼리 파라미터에서 'store' 값을 추출합니다.
 * 예: https://...app?store=store_123  => "store_123" 반환
 */
function getStoreIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('store'); // 'store'라는 이름의 파라미터 값을 가져옴
}// 1. 🚨🚨 여기에 사용자님의 Firebase 설정 정보를 붙여넣으세요 🚨🚨
// (Firebase 콘솔 > 프로젝트 설정 > 일반 > '내 앱'에서 찾을 수 있습니다)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// 2. Firebase 앱 초기화
firebase.initializeApp(firebaseConfig);
// Firestore (데이터베이스) 서비스 초기화
const db = firebase.firestore();


// 3. HTML 요소들을 JavaScript 변수로 가져오기
const registerButton = document.getElementById('registerButton');
const partySizeInput = document.getElementById('partySizeInput');
const statusMessage = document.getElementById('statusMessage');

// 4. "등록하기" 버튼 클릭 이벤트 설정
registerButton.addEventListener('click', async () => {
    
    // 5. 입력된 인원수 가져오기
    const partySize = parseInt(partySizeInput.value, 10);

    // 6. 유효성 검사
    if (isNaN(partySize) || partySize < 1) {
        statusMessage.textContent = "인원수를 정확히 입력해 주세요.";
        statusMessage.style.color = "red";
        return;
    }

    // 7. URL에서 가게 ID 가져오기 (예: ...?store=store_123)
    const storeId = getStoreIdFromUrl();
    if (!storeId) {
        statusMessage.textContent = "가게 정보를 찾을 수 없습니다. (QR코드가 잘못됨)";
        statusMessage.style.color = "red";
        return;
    }

    try {
        // 8. Firebase DB에 데이터 쓰기 (가장 핵심!)
        // 'stores' 컬렉션 > (가게ID) 문서 > 'waitingList' 하위 컬렉션에 새 문서 추가
        const docRef = await db.collection('stores').doc(storeId).collection('waitingList').add({
            size: partySize,          // 인원수
            status: "waiting",        // 현재 상태 (대기중)
            timestamp: new Date()     // 등록 시간 (서버 시간 기준)
        });

        // 9. 등록 성공
        statusMessage.textContent = `등록 완료! (대기번호: ${docRef.id.substring(0, 6)})`; // 간단한 대기번호 표시
        statusMessage.style.color = "green";
        registerButton.disabled = true; // 중복 등록 방지
        partySizeInput.disabled = true;

    } catch (error) {
        // 10. 등록 실패
        console.error("Error adding document: ", error);
        statusMessage.textContent = "등록에 실패했습니다. 다시 시도해 주세요.";
        statusMessage.style.color = "red";
    }
});


/**
 * 헬퍼 함수: URL의 쿼리 파라미터에서 'store' 값을 추출합니다.
 * 예: https://...app?store=store_123  => "store_123" 반환
 */
function getStoreIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return params.get('store'); // 'store'라는 이름의 파라미터 값을 가져옴
}
