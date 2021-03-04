import React, { useState } from "react";

let defaultData = ["Row 1", "Row 2"];

const todoList = {
	backgroundColor: "rgb(230,230,230)",
	margin: "auto",
	width: "30%",
	height: "400px",
	display: "flex",
	flexDirection: "column",
	flexWrap: "wrap",
	marginTop: "100px",
	justifyContent: "center"
};

const heading = {
	color: "rgb(216, 191, 216)",
	fontSize: "60px",
	textAlign: "center"
};

const rowContainer = {
	flexDirection: "column",
	flexWrap: "wrap",
	justifyContent: "center",
	margin: "auto",
	backgroundColor: "white",
	flexShrink: "3"
};

const rowElement = {
	height: "50px"
};

export function Todo() {
	const test = event => {
		list.push(event.target.value);
		list = list.map(item => (
			<tr key={item.toString()}>
				<td>{item}</td>
			</tr>
		));
		setList(list);
		console.log(list);
	};

	let [list, setList] = useState(defaultData);
	return (
		<div style={todoList}>
			<h1 style={heading}> todos </h1>
			<div style={rowContainer}>
				<table>
					<tr>
						<td>
							<input type="text" onClick={test} />
						</td>
					</tr>
					{list.map(item => (
						<tr key={item.toString()}>
							<td>{item}</td>
						</tr>
					))}
				</table>
			</div>
		</div>
	);
}
