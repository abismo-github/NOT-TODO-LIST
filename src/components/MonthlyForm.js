import React, { useState } from "react";
import { postTodo } from "../api/api";
import ReactDatePicker, { registerLocale } from "react-datepicker";
import "../style/CustomDatePicker.css";
import ko from "date-fns/locale/ko";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";
import { Button, Input, InputNumber, Radio, Form, Modal } from "antd";
import getYear from "date-fns/getYear";
import getMonth from "date-fns/getMonth";
import { format } from "date-fns";
import {
  AddFormTitle,
  AddFormWrap,
  FormLabel,
  SaveBtn,
} from "../style/MonthlyAddCSS";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const MonthlyForm = ({ todoData, setTodoData, nickId, setNickId }) => {
  // state 변수
  const [strValue, setStrValue] = useState("");
  const [goalNumValue, setGoalNumValue] = useState("");
  const [selectedOption, setSelectedOption] = useState([0]);
  // const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [dailyAddNumber, setDailyAddNumber] = useState(0);

  // console.log("nickId",nickId)

  //모달관련 state
  // const [modalMessage, setModalMessage] = useState(""); // 메세지
  // const [isModalOpen, setIsModalOpen] = useState(false);

  // 모달창
  // const showModal = () => {
  //   setIsModalOpen(true);
  // };
  // const handleOk = () => {
  //   setIsModalOpen(false);
  // };

  // const handleCancel = () => {
  //   setIsModalOpen(false);
  // };

  // 셀렉트 옵션
  const selectTimePrice = [
    { value: "time", label: "time" },
    { value: "price", label: "price" },
  ];

  // 만약 당월이라면 현재날짜부터 말일까지
  // 만약 다음달이라면 1일부터 말일까지(제대로 구현안됨. 수정필요)

  const selectedMonthYYYYMM = format(selectedMonth, "yyyy-MM");

  // console.log(selectedMonthYYYYMM);

  // 목표명
  const handleStrChange = e => {
    // console.log("str", e.target.value);
    setStrValue(e.target.value);
  };

  // 목표수량
  const handleNumChange = e => {
    console.log("num", e.target.value);
    setGoalNumValue(e.target.value);
  };

  // 옵션 선택
  const handleSelectedOption = e => {
    setSelectedOption(e.target.value);
    console.log("e.target.value", e.target.value);
  };

  // ant form 전송
  const onFinish = values => {
    console.log("Success:", values);

    const newTodo = {
      // 임시로 memberId:1 로 고정
      memberId: 1,
      notTodo: strValue,
      costCategory: selectedOption,
      goalCost: goalNumValue,
      monthYear: selectedMonthYYYYMM,
      // dailyAddNumber: dailyAddNumber,
    };
    console.log("selectedOption.value", selectedOption.value);
    console.log("newTodo", newTodo);

    setTodoData([...todoData, newTodo]);

    // if (!values.title) {
    //   showModal();
    //   setModalMessage("목표를 입력해야 합니다");
    //   return false;
    // }
    // if (!values.options) {
    //   showModal();
    //   setModalMessage("단위를 입력해야 합니다");
    //   return false;
    // }
    // if (!values.goalNumber) {
    //   showModal();
    //   setModalMessage("목표수량을 선택해야 합니다");
    //   return false;
    // }

    //Post
    postTodo(newTodo, setTodoData);

    // 전송완료 된 다음 입력창을 초기화 하자(제대로 안됨, 수정필요)
    setStrValue("");
    setGoalNumValue("");
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  registerLocale("ko", ko);

  return (
    <div>
      <AddFormWrap>
        <Form
          name="goalInput"
          // 초기값 설정하기. { label : "원하는 초기값" }
          initialValues={""}
          // 실제로 post하는 자리
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="on"
          layout="vertical"
        >
          <div>
            <FormLabel>월 선택</FormLabel>
            <ReactDatePicker
              className="custom-datepicker"
              selected={selectedMonth}
              onChange={date => setSelectedMonth(date)}
              locale="ko"
              dateFormat="yyyy/MM"
              minDate={new Date()} // 오늘날짜 이전은 선택못하게
              showMonthYearPicker
            />
          </div>
          <AddFormTitle>
            <FormLabel>한달목표</FormLabel>
            <Form.Item
              // label="한달 목표"
              name="notTodo"
              rules={[
                {
                  required: true,
                  message: "항목을 입력하세요",
                },
                { max: 20, message: "항목을 20자이내로 입력하세요" },
                {
                  pattern: /^\S/,
                  message: "항목을 입력하세요",
                },
              ]}
            >
              <Input
                size="large"
                value={strValue}
                onChange={handleStrChange}
                style={{ width: "200px" }}
              />
            </Form.Item>
          </AddFormTitle>
          <div>
            <FormLabel>단위</FormLabel>
            <Form.Item
              // label="목표 단위"
              name="costCategory"
              options={selectTimePrice}
              onChange={handleSelectedOption}
            >
              <Radio.Group style={{ display: "inline-block" }} size="large">
                <div>
                  <Radio.Button value="TIME">TIME</Radio.Button>
                  <Radio.Button value="PRICE">PRICE</Radio.Button>
                </div>
              </Radio.Group>
            </Form.Item>
          </div>
          <div>
            <FormLabel>목표수량</FormLabel>
            <Form.Item
              // label="목표수량"
              name="goalCost"
              rules={[
                {
                  type: "number",
                  message: "수량을 입력하세요",
                },
                { max: 10, message: "수량을 10자이내로 입력하세요" },
                {
                  required: true,
                  message: "수량을 입력하세요",
                },
                {
                  pattern: /^\S/,
                  message: "수량을 입력하세요",
                },
              ]}
            >
              <Input
                size="large"
                value={goalNumValue}
                onChange={handleNumChange}
                style={{ width: "100px" }}
              />
            </Form.Item>
          </div>
          <div>
            <Form.Item>
              <SaveBtn>
                <Button
                  htmlType="submit"
                  size="large"
                  style={{ background: "#3b82f6", color: "#fff" }}
                >
                  <FontAwesomeIcon
                    icon={faPlus}
                    style={{ marginRight: "5px" }}
                  />
                  Add
                </Button>
              </SaveBtn>
            </Form.Item>
          </div>
        </Form>
      </AddFormWrap>

      {/* 경고모달 */}
      {/* <Modal
        // title="로그인 실패..."
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        centered
        footer={
          <Button key="back" onClick={handleOk}>
            Return
          </Button>
        }
      >
        <p>안내!</p>
        <p>{modalMessage}</p>
      </Modal> */}
    </div>
  );
};

export default MonthlyForm;
