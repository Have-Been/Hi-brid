//날짜 데이터를 가져오기 위한 Date 함수
let date = new Date();

//const = () => block 내부에서만 구현 가능, 다시 선언이 될 수 없다. function과는 다르게 선언하려면 함수를 만들고 반드시 맨 아래에 선언해야 한다.
const renderCalender = () => {
    //년도와 월의 데이터를 date 함수를 통해 가져오기
    const viewYear = date.getFullYear();
    const viewMonth = date.getMonth();

    //querySelector 는 내 문서에 있는 Element를 검색해서 일치하는 첫 번째 Element를 반환해준다.
    //대체 가능한 메서드는 getElemetById
    //year-month 태그에 접근해서 맞는 연도와 월 넣어주기
    document.querySelector('.year-month').textContent = `${viewYear}년 ${viewMonth + 1}월`
    // ' <- 이게 아닌 ` <- 이거...

    //지난 달의 마지막 날짜와 요일, 이번 달의 마지막 날짜와 요일을 알아내기 위해 prevLast에 0값을 전달 -> 지난 달의 마지막 날의 Date 객체 생성
    //같은 원리로 다음 달의 0번 째 날을 뽑으면 이번 달의 마지막 Date 객체가 생성된다.
    const prevLast = new Date(viewYear, viewMonth, 0);
    const thisLast = new Date(viewYear, viewMonth + 1, 0);

    //마지막 날짜
    const PLDate = prevLast.getDate();
    //마지막 요일
    const PLDay = prevLast.getDay();

    const TLDate = thisLast.getDate();
    const TLDay = thisLast.getDay();

    /* 날짜들을 담아둘 배열 생성
    0 ~ n-1 까지의 값을 얻고 싶기 때문에
     1. Array(TLDate + 1) 로 길이가 TLDate + 1 인 배열을 생성
     2. 모든 요소들은 빈 값이기 때문에 keys() 메서드를 활용해 0 ~ n-1 까지의 Array Iterator(같은 컬렉션을 반복할 수 있는 객체) 생성
     3. 전개 구문을 통해 Array Iterator를 배열로 만들어내고 나면 TLDate + 1 ~ TLDate - 1 까지의 배열을 얻어낼 수 있다.
     4. 제일 앞에 있는 0을 없애기 위해 배열을 자르는 slice 메서드 사용 */
    const prevDates = [];
    const thisDates = [...Array(TLDate + 1).keys()].slice(1);
    const nextDates = [];

    /* 
    지난 달의 마지막 요일이 토요일(6) 이라면 굳이 그릴 필요가 없으니
    0부터 시작해 지난 달의 마지막 요일이 될 때까지 반복해서 작성하게 만들고,
    지난 달의 마지막 날짜부터 1씩 줄어든 값은 unshift 메서드를 통해 prevDates 배열 앞쪽으로 계속 채워 넣는 방식
    unshift => 배열의 앞에 새로운 배열값을 추가하기 위한 메서드
    */
    if (PLDay !== 6) {
        for (let i = 0; i < PLDay + 1; i++) {
            prevDates.unshift(PLDate - i)
        }
    }
    /*
    이번 달의 마지막 날짜의 요일을 기준으로 필요한 개수를 파악해 1부터 1씩 증가시키며 nextDates 배열에 하나씩 채워 넣는 방식.
    push() => 배열의 뒤에 새로운 배열값을 추가하기 위한 메서드
    */
    for (let i = 1; i < 7 - TLDay; i++) {
        nextDates.push(i);
    }

    // Dates 합침
    const dates = prevDates.concat(thisDates, nextDates);

    dates.forEach((date, i) => {
        dates[i] = `<div class="date">${date}</div>`;
    })
    //join() : 문자열을 배열로 반환시켜주는 메소드
    document.querySelector('.dates').innerHTML = dates.join('');
}

//맨 아래에 함수를 선언한 모습
renderCalender();

const prevMonth = () => {
    date.setMonth(date.getMonth() - 1)
    renderCalender();
}

const nextMonth = () => {
    date.setMonth(date.getMonth() + 1)
    renderCalender();
}

const goToday = () => {
    date = new Date();
    renderCalender();
}