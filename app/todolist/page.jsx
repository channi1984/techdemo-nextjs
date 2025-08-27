"use client";

import Image from "next/image";
import { useState } from "react";
import initTodos from "@/data/todosData";

export default function TodoList() {
	// 할 일 목록을 담을 상태
	const [todos, setTodos] = useState(initTodos);
	// 입력창의 값을 담을 상태
	const [input, setInput] = useState("");

	// 할 일 추가 버튼 클릭시 실행될 함수
	const handleAddTodo = () => {
		// 입력창에 내용이 없으면 함수 종류
		if (input.trim() === "") {
			alert('할 일이 입력되지 않았습니다 :D');
			return;
		}

		//새로운 할 일 객체 생성
		const newTodo = {
			id: Date.now(), //고유 ID 생성
			text: input,
			completed: false,
		};

		// 기존 todos 배열에  새로운 할 일을 추가하고 상태 업데이트
		setTodos([...todos, newTodo]);
		// 입력창 비우기
		setInput("");
	};

	// 엔터 키 입력시 실행될 함수
	const handleAddTodoOnEnter = (e) => {
		if (e.key === 'Enter') {
			handleAddTodo();
		}
	}

	// 체크박스 클릭 시
	const handleToggleComplete = (id) => {
		//id가 일치하는 할 일의 completed 상태를 토글
		const newTodos = todos.map((todo) =>
			todo.id === id ? { ...todo, completed: !todo.completed } : todo
		)

		// 모든 할 일이 완료되었는지 확인
		const allCompleted = newTodos.every(todo => todo.completed);

		// 모든 할 일이 완료되었으면 알림창
		if (allCompleted) {
			alert('🎉 모든 할 일을 완료했습니다! 🎉');
		}

		setTodos(newTodos);
	}

	// 삭제 버튼 클릭시
	const handleDeleteTodo = (id) => {
		// id가 일치하지 않은 할 일들만 남겨서 배열을 필터링
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	const completedCount = todos.filter((todo) => todo.completed).length;

	return (
		<div className="desc">
			{/* 투두 리스트 */}
			<div className="wrap-todo">
				<div className="header">
					<div className="logo">
						<Image src="/images/ic-todo.png" alt="Todo 아이콘" width={252} height={96} />
					</div>
					<div className="search">
						<div className="input">
							<input
								type="text"
								placeholder="할 일을 입력해 주세요."
								value={input}
								onChange={(e) => setInput(e.target.value)}
								onKeyDown={handleAddTodoOnEnter}
							/>
						</div>
						<div className="button">
							<button type="button" onClick={handleAddTodo}>추가</button>
						</div>
					</div>
				</div>

				<div className="state">
					<div className="total">
						Todo
						<span>{todos.length}</span>
					</div>
					<div className="complete">
						Complete
						<span>{completedCount}</span>
					</div>
				</div>

				<div className="list">
					{/* 할 일이 없을 때 */}
					{todos.length === 0 ? (
						<div className="empty">
							<div className="text">
								아직 등록된 할 일이 없습니다.<br />
								할 일을 추가해 주세요.
							</div>
						</div>
					) : (
						<div className="work">
							<ul>
								{todos.map((todo) => (
									<li key={todo.id}>
										<div className="left">
											<div className="checkbox">
												<label htmlFor={`check-${todo.id}`} className="cm-check style1">
													<input
														type="checkbox"
														name={`check-${todo.id}`}
														id={`check-${todo.id}`}
														checked={todo.completed}
														onChange={() => handleToggleComplete(todo.id)}
													/>
													<span>{todo.text}</span>
												</label>
											</div>
										</div>
										<div className="right">
											<div className="del">
												<button
													type="button"
													className="btn-del"
													onClick={() => handleDeleteTodo(todo.id)}
												>
													삭제하기
												</button>
											</div>
										</div>
									</li>
								))}
							</ul>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}