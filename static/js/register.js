"use strict";
const catBox = document.querySelector("#category");
const form = document.querySelector(".main-form");
const modal = document.querySelector(".success");
const back = document.querySelector(".close_modal");

const fetchCategories = async function () {
	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");
	const url = "https://backend.getlinked.ai/";

	const requestOptions = {
		method: "GET",
		headers: myHeaders,
		redirect: "follow",
	};
	console.log("Hello");

	try {
		// console.log(res);
		const res = await fetch(`${url}hackathon/categories-list`, requestOptions);
		console.log(res);
		if (!res.ok) throw new Error("Chck Interet Connection and Reload Page");
		const data = await res.json();

		console.log(data);

		inputCategories(data);
		return data;
	} catch (err) {
		fetchCategories();
		throw new Error(`${err.message}`);
	}
};

const inputCategories = function (data) {
	const markup = data
		.map((dt) => {
			return `<option value="${dt.id}">${dt.name}</option>`;
		})
		.join("");
	console.log(markup);

	catBox.innerHTML = markup;
};

const collectFormResult = function () {
	const formData = [...form];
	console.log(formData);
	let obj = {};
	formData.forEach((dt) => {
		if (!dt.id) return;
		if (!dt.value) throw new Error(`Fill the ${dt.id} box.`);
		if (dt.id === "team_name") {
			obj = { ...obj, team_name: dt.value };
		}
		if (dt.id === "phone") {
			obj = { ...obj, phone_number: dt.value };
		}
		if (dt.id === "email") {
			obj = { ...obj, email: dt.value };
		}
		if (dt.id === "topic") {
			obj = { ...obj, project_topic: dt.value };
		}
		if (dt.id === "category") {
			obj = { ...obj, category: +dt.value };
		}
		if (dt.id === "grp_size") {
			obj = { ...obj, group_size: +dt.value };
		}

		if (dt.id === "terms" && dt.checked) {
			obj = { ...obj, privacy_poclicy_accepted: dt.checked };
		} else if (dt.id === "terms" && !dt.checked) {
			throw new Error("Accept our terms of service");
		}
	});
	console.log(obj);
	return obj;
};

const submitForm = async function (e) {
	e.preventDefault();
	const obj = collectFormResult();

	const status = registerUser(obj);
};

window.addEventListener("load", async function () {
	fetchCategories();
});

form.addEventListener("submit", async function (e) {
	await submitForm(e);
});

const registerUser = async function (obj) {
	const url = "https://backend.getlinked.ai/";

	const myHeaders = new Headers();
	myHeaders.append("Content-Type", "application/json");

	const raw = JSON.stringify(obj);

	const requestOptions = {
		method: "POST",
		headers: myHeaders,
		body: raw,
		redirect: "follow",
	};

	try {
		const res = await fetch(`${url}hackathon/registration`, requestOptions);
		console.log(res);
		if (!res.ok) throw new Error("Internect Connection Error");

		const data = res.json();
		console.log(data);
	} catch (err) {
		throw new Error(err.message);
	}
};

const openModal = function () {
	modal.classList.remove("hidden");
};

const closeModal = function () {
	modal.classList.add("hidden");
};

back.addEventListener("click", closeModal);

// "email":"sample@eexample.com",
//     "phone_number":"0903322445533",
//     "team_name": "Space Explore",
//     "group_size": 10,
//     "project_topic":"Web server propagation",
//     "category": 1,
//     "privacy_poclicy_accepted": true
