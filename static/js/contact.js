"use strict";

const backBtn = document.querySelector(".back-link-btn");
const form = document.querySelector(".main-form");

const goback = function () {
	window.history.back();
};

const collectFormResult = function () {
	const formData = [...form];

	let obj = {};
	formData.forEach((dt) => {
		console.log(dt);
		if (!dt.value) throw new Error(`Fill the ${dt.id} box.`);
		if (dt.id === "name") {
			obj = { ...obj, first_name: dt.value };
		}
		if (dt.id === "number") {
			obj = { ...obj, phone_number: dt.value };
		}
		if (dt.id === "mail") {
			obj = { ...obj, email: dt.value };
		}
		if (dt.id === "message") {
			obj = { ...obj, message: dt.value };
		}
	});

	return obj;
};

const postResult = async function (formObj) {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	const url = "https://backend.getlinked.ai/";
	const data = JSON.stringify(formObj);
	console.log(data);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: data,
		redirect: "follow",
	};

	try {
		const res = await fetch(`${url}hackathon/contact-form`, requestOptions);
		if (!res.ok) throw new Error("Could Not submit form");
		const data = await res.json();
		console.log(data);

		alert("The message has been successfully sent");
	} catch (err) {
		console.log(err);
	}
};

const handleSubmit = async function (e) {
	e.preventDefault();
	try {
		const obj = collectFormResult();
		await postResult(obj);
	} catch (err) {
		alert(err.message);
	}
};

form.addEventListener("submit", function (e) {
	handleSubmit(e);
});
backBtn.addEventListener("click", goback);
