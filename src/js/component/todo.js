import React, { useState } from "react";
import "/workspace/todo_list/src/styles/index.css";

// Array used to store the list items
let list_Items = ["Row 1", "Row 2"];

// Todo Tag function
export function Todo() {
	const test = event => {
		if (event.target.value != "") {
			list_Items.push(event.target.value);
			list = list_Items.map((item, index) => (
				<tr key={index.toString()}>
					<td>{item}</td>
				</tr>
			));
			setList(list);
			console.log(list);
		}
	};

	const test2 = id => {
		let tmpArray = [];
		let counterArray = 0;
		console.log(id);
		for (let i = 0; i < list_Items.length; i++) {
			if (i != id) {
				tmpArray[counterArray] = list_Items[i];
				counterArray++;
			}
		}

		list_Items = tmpArray;
		list = list_Items.map((item, index) => (
			<tr key={index.toString()}>
				<td>{item}</td>
			</tr>
		));
		setList(list);
	};

	let [list, setList] = useState(list_Items);
	return (
		<div className="todoList">
			<h1 className="heading"> todos </h1>
			<div className="rowContainer">
				<table>
					<tr>
						<td>
							<input type="text" onClick={test} />
						</td>
					</tr>
					{list.map((item, index) => (
						<tr key={index.toString()}>
							<td>{item}</td>
							<td
								className="xbutton"
								onClick={() => test2(index)}>
								x
							</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
}
