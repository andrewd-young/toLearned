import {useState} from "react";
import ReactDOMServer from "react-dom/server";

export default function Written(props) {
	const termsArray = props.terms;
	//add third element 0 to every array in termsArray
	const [message, setMessage] = useState("");
	let answerIndex = Math.floor(props.questionSeed * termsArray.length);

	const handleChange = (event) => {
		setMessage(event.target.value);
	};

	function eventAcceptor(e) {
		var code = e.code;
		if (code === "Enter") {
			document.getElementById("cardOverlay").innerHTML = "";
			document.removeEventListener("keypress", eventAcceptor, false);
		}
	}

	return (
		<div className="relative space-y-5 block bg-white rounded-lg border border-gray-200 shadow-md  dark:bg-gray-800 dark:border-gray-700 h-52">
			<div id="cardOverlay"></div>
			<div className="p-6">
				<label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">{termsArray[answerIndex][1]}</label>
				<input
					onChange={handleChange}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							props.setLearnCounter();
							if (message === termsArray[answerIndex][0]) {
								termsArray[answerIndex][2] += 1;
								setTimeout(() => {
									document.getElementById("cardOverlay").innerHTML = "";
								}, 1000);
								document.getElementById("cardOverlay").innerHTML = ReactDOMServer.renderToString(
									<div className="flex absolute w-full h-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<h1 className="m-auto text-5xl text-green-500">
											<b>Correct!</b>
											<svg className="w-12 h-12 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
										</h1>
									</div>
								);
							} else {
								termsArray[answerIndex][2] -= 1;
								setTimeout(() => {
									document.addEventListener("keypress", eventAcceptor, false);
								}, 1000);
								document.getElementById("cardOverlay").innerHTML = ReactDOMServer.renderToString(
									<div className="flex absolute w-full h-full bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
										<h1 className="m-auto text-5xl text-red-500">
											<b>Incorrect</b>
											<svg className="w-12 h-12 float-right" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
												<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
											</svg>
										</h1>
										<p className="text-base dark:text-slate-400 m-auto">
											You said <b>{message}</b>
										</p>
										<p className="text-base dark:text-slate-400 m-auto">
											The correct answer was <b>{termsArray[answerIndex][0]}</b>
										</p>
									</div>
								);
							}
							setMessage("");
						}
					}}
					value={message}
					type="text"
					id="writtenInput"
					className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
					placeholder=""
					autoComplete="off"
				></input>
			</div>
		</div>
	);
}
