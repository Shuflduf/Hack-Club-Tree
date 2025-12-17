<div class="background">
	<form>
		<div class="question">
			<h1>Transform</h1>
			<div class="spacer" />
			<div class="answer">
				<img src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-reload" alt="rotation" />
				<input type="range" min="-180" max="180" step="10" />
			</div>
			<div class="answer">
				<h2>Flipped</h2>
				<input type="checkbox" />
			</div>
			<div class="subtitle">Position related info</div>
		</div>
	</form>
</div>

<style>
	.background {
		width: 100dvw;
		height: 100dvh;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(5px);
		z-index: 20;
	}
	form {
		font-family: "Jua";
		width: min(600px, 80%);

		padding: 32px;
		background-color: #f8e9d3;
		background-image: repeating-conic-gradient(
			from 0deg,
			rgba(0, 0, 0, 0.08) 0deg 90deg,
			transparent 90deg 180deg
		);
		background-size: 120px 120px;
		border: 2px solid rgba(139, 102, 70, 0.15);
		border-radius: 10px;
		box-shadow: 0 18px 32px #2f221514;
	}

	.question {
		display: flex;
		flex-direction: column;
		background-color: #dd9f40;
		margin-top: 40px;
		position: relative;
		border-radius: 0 10px 10px 10px;
		color: #f8e9d3;

		h1 {
			font-size: 1.25rem;
			position: absolute;
			top: -30px;
			left: 0;
			margin: 0;
			padding: 8px 24px;
			border-radius: 10px 10px 0 0;

			background-color: #dd9f40;
		}

		.spacer {
			height: 12px;
		}

		.answer {
			display: flex;
			padding-left: 24px;
		}

		input {
			margin: 0;
			padding: 0 16px;
			background-color: #f8e9d3;
			appearance: none;
			border-radius: 0 8px 8px 0;
			cursor: pointer;
		}
		input[type=range]::-moz-range-track{
			background-color: #bf782b;
			height: 2px;
		}
		input[type=range]::-moz-range-thumb {
		  background: #f8e9d3;
		  border-radius: 50%;
		  // border-color: #bf782b;
		  border: 2px solid #bf782b;
}

		img {
			background-color: #bf782b;
			border-radius: 8px 0 0 8px;
			height: 48px;
		}

		.subtitle {
			background-color: #e7bf6e;
		}
	}
</style>
