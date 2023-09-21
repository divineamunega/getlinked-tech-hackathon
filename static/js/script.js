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

const moveDiv = function (container) {
	const movableDiv = document.createElement("div");
	// movableDiv.classList.add("blur-grad");

	movableDiv.style.width = "100px";
	movableDiv.style.height = "100px";
	movableDiv.style.backgroundColor = "#903aff";
	movableDiv.style.position = "fixed";
	movableDiv.style.left = "50%";
	movableDiv.style.filter = "blur(50px)";
	movableDiv.style.transition = "transform .15s ease";
	movableDiv.style.top = "0";
	movableDiv.style.left = "0";
	movableDiv.style.zIndex = "-100";
	document.body.appendChild(movableDiv);

	window.addEventListener("mousemove", (event) => {
		const x = event.clientX - 75;
		const y = event.clientY - 75;
		// movableDiv.style.top = y + "px";
		// movableDiv.style.left = x + "px";
		movableDiv.style.transform = `translate(${x}px, ${y}px)`;
	});
};

navbar();
moveDiv();
