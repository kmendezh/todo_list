import React, { useState } from "react";
import "/workspace/todo_list/src/styles/index.css";

// Array used to store the list items
let list_Items = ["No tasks, add a task"];

// Todo Tag function
export function Todo() {
	// Function used to add elements to the list
	const addElement = event => {
		if (event.target.value != "") {
			list_Items.push(event.target.value);
			list = list_Items.map((item, index) => (
				<tr key={index.toString()}>
					<td>{item}</td>
					<td
						className="xbutton"
						onClick={() => removeElement(index)}>
						x
					</td>
				</tr>
			));
			setList(list);
		}
	};
	// Function used to remove elements from the list
	const removeElement = id => {
		let tmpArray = [];
		let counterArray = 0;
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
				<td className="xbutton" onClick={() => removeElement(index)}>
					x
				</td>
			</tr>
		));
		setList(list);
	};

	let [list, setList] = useState(list_Items);
	return (
		<div className="todoList">
			<h1 className="heading"> todos </h1>
			<div className="rowContainer">
				<table className="tableStyle">
					<tr>
						<td>
							<input
								type="text"
								onClick={addElement}
								className="inputStyle"
							/>
						</td>
					</tr>
					{list}
					<tr>
						<td>{list.length} items left</td>
					</tr>
				</table>
			</div>
		</div>
	);
}
