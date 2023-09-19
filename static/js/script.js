"use strict";
console.log("Hello World");

const navbar = function () {
	const toggleBtn = document.querySelector(".toggle-btn");
	const closeNav = document.querySelector(".close-btn");
	const smallNav = document.querySelector(".nav-small");

	smallNav.classList.add("hidden");

	const toggleNav = function () {
		smallNav.classList.toggle("hidden");
	};
	toggleBtn.addEventListener("click", toggleNav);
	closeNav.addEventListener("click", toggleNav);
};

navbar();
