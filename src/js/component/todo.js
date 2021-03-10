import React, { useState, useEffect } from "react";
import "/workspace/todo_list/src/styles/index.css";

// Array used to store the list items
let list_Items = [];
let listFetchItems = [];

// Global variables
let isTheListEmpty = 1;
let url = "https://assets.breatheco.de/apis/fake/todos/user/kmendezh?=";

// Fetch options
let myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

let getRequestOptions = {
	method: "GET",
	headers: myHeaders,
	redirect: "follow"
};

let putRequestOptions = {
	method: "PUT",
	headers: myHeaders,
	body: [],
	redirect: "follow"
};

let postRequestOptions = {
	method: "POST",
	headers: myHeaders,
	body: JSON.stringify([]),
	redirect: "follow"
};

// Todo Tag function
export function Todo() {
	// Function used to add elements to the list
	const addElement = event => {
		if (event.target.value != "") {
			/*if (isTheListEmpty == 1) {
				list_Items.pop();
				isTheListEmpty = 0;
			}*/
			listFetchItems.push(event.target.value);
			list = listFetchItems.map((item, index) => (
				<tr key={index.toString()}>
					<td>{item}</td>
					<td
						className="xbutton"
						onClick={() => removeElement(index)}>
						x
					</td>
				</tr>
			));
			// PUT Command
			// PUT - Body
			let tmpArray = [];
			for (let i = 0; i < listFetchItems.length; i++) {
				let tmpObj = { label: "", done: false };
				tmpObj.label = listFetchItems[i];
				tmpArray.push(tmpObj);
			}

			// Update the List
			putRequestOptions.body = JSON.stringify(tmpArray);

			putFetch();
			// Update the screen view
			setList(list);
		}
	};
	// Function used to remove elements from the list
	const removeElement = id => {
		let tmpArray = [];
		let counterArray = 0;
		for (let i = 0; i < listFetchItems.length; i++) {
			if (i != id) {
				tmpArray[counterArray] = listFetchItems[i];
				counterArray++;
			}
		}

		listFetchItems = tmpArray;
		list = listFetchItems.map((item, index) => (
			<tr key={index.toString()}>
				<td>{item}</td>
				<td className="xbutton" onClick={() => removeElement(index)}>
					x
				</td>
			</tr>
		));

		// PUT Command
		// PUT - Body
		tmpArray = [];
		// Skip if the list is empty
		if (listFetchItems.length > 0) {
			for (let i = 0; i < listFetchItems.length; i++) {
				let tmpObj = { label: "", done: false };
				tmpObj.label = listFetchItems[i];
				tmpArray.push(tmpObj);
			}
		}
		// Update the List
		putRequestOptions.body = JSON.stringify(tmpArray);
		putFetch();

		// Update the screen view
		setList(list);
	};

	let [list, setList] = useState(list_Items);

	// Get the TODO List
	useEffect(() => {
		fetch(url, getRequestOptions)
			.then(response => {
				if (response.ok) {
					return response.json();
				}

				// If no List was detected, POST a new one
				else if (response.status == 404) {
					return postFetch();
				} else {
					return response.json();
				}
			})
			.then(result => {
				for (let i = 0; i < result.length; i++) {
					listFetchItems[i] = result[i].label;
				}

				// Update the elements on the screen
				list = listFetchItems.map((item, index) => (
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
			})
			.catch(error => {
				console.log("error", error);
			});
	}, []);

	return (
		<div className="todoList">
			<h1 className="heading"> TODO List </h1>
			<div className="rowContainer">
				<table className="tableStyle">
					<tr>
						<td>
							<input
								type="text"
								onClick={addElement}
								className="inputStyle"
								placeholder="Agregue tareas a la lista..."
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

// PUT Function

function putFetch() {
	fetch(url, putRequestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));
}

// POST Function
function postFetch() {
	fetch(url, postRequestOptions)
		.then(response => response.text())
		.then(result => console.log(result))
		.catch(error => console.log("error", error));
}
