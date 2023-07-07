import { useEffect, useState } from "react";
import {
  DailyEditListBtn,
  DailyEditListNumber,
  DailyEditListTdUnit,
  DailyEditListTitle,
  DailyEditListTr,
  DailyEditNumberInput,
  DailyListBtn,
  DailyListNumber,
  DailyListTitle,
  DailyListTr,
} from "../style/DailySectionCSS";
import { patchDailyAddNum } from "../api/api";

const DailyListItem = ({ todoData, setTodoData, todayList, item }) => {
  // 데일리낫투두 수정 관련 state
  const [dailyEdit, setDailyEdit] = useState(false);
  const [dailyEditTodayNum, setDailyEditTodayNum] = useState(0);


  // 이벤트 핸들러
  //선택편집(버튼활성화하기)
  const handleEditClick = goalId => {
    console.log("handleEdit_id", item.goalId);
    setDailyEdit(true);
  };

  // 일일수량 변경
  const handleDailyNumEditChange = e => {
    setDailyEditTodayNum(e.target.value);
  };

  // 일일수량 변경 취소
  const handleDailyCancelClick = () => {
    setDailyEdit(false);
  };

  // 일일수량 변경 저장하기
  const handleDailySaveClick = _goalId => {
    let newTodoData = todayList.map(item => {
      if (item.goalId === _goalId) {
        item.useCost = dailyEditTodayNum;
      }
      return item;
    });
    setTodoData(newTodoData);

    patchDailyAddNum(_goalId, dailyEditTodayNum);
    console.log("newTodoData", newTodoData);
    setDailyEdit(false);
    setDailyEditTodayNum("");
  };
  
  useEffect(() => {
    // todayList 또는 dailyEdit가 변경될 때마다 실행되는 로직
    // 화면을 갱신하는 코드 작성
    
    console.log("페이지 리랜더링")

  }, [todayList, dailyEdit, todoData]);


  if (dailyEdit) {
    // 수정중인 상태
    return (
      <DailyEditListTr>
        <DailyEditListTitle>{item.notTodo}</DailyEditListTitle>
        {/* <DailyEditListNumber>{dailyEdit.goalNumber}0000</DailyEditListNumber> */}
        {/* <DailyEditListNumber>누적숫자</DailyEditListNumber> */}
          {/* 오늘의 비용 수정 */}
          <>(오늘의 비용 추가)</>
        <DailyEditListNumber>
          <DailyEditNumberInput
            type="number"
            defaultValue={dailyEditTodayNum}
            onChange={handleDailyNumEditChange}
          />
        </DailyEditListNumber>
        <DailyEditListTdUnit>{item.costCategory}</DailyEditListTdUnit>
        <DailyEditListBtn>
          <button
            onClick={() => {
              handleDailySaveClick(item.goalId);
            }}
            className="w-12 p-2 my-1 bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            저장
          </button>
          <button
            onClick={handleDailyCancelClick}
            className="w-12 p-2 my-1 bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
          >
            취소
          </button>
        </DailyEditListBtn>
      </DailyEditListTr>
    );
  } else {
    return (
      <DailyListTr>
        <DailyListTitle>{item.notTodo}</DailyListTitle>
        {/* 목표수량 */}
        <DailyListNumber>{item.goalCost}{item.costCategory}</DailyListNumber>        
        {/* <DailyListTdUnit>{item.costCategory}</DailyListTdUnit> */}
        {/* 누적수량 */}
        <DailyListNumber>{item.useCostSum}{item.costCategory}</DailyListNumber>
        {/* 오늘수량 */}
        {/* <DailyListNumber>{item.useCost}0000</DailyListNumber> */}
        {/* <DailyListTdUnit>{item.costCategory}</DailyListTdUnit> */}
        <DailyListBtn
          onClick={() => handleEditClick(item.goalId)}
          className="p-2 m-1 bg-blue-500 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition ease-in duration-200 text-center font-bold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 rounded-lg"
        >
          입력
        </DailyListBtn>
      </DailyListTr>
    );
  }
};
export default DailyListItem;