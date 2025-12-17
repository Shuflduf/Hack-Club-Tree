<div class="background">
	<form>
		<div class="question">
			<h1>Transform</h1>
			<div class="spacer"></div>
			<div class="answer">
				<img
					draggable="false"
					src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-reload"
					alt="rotation"
				/>
				<input type="range" min="-180" max="180" step="10" />
			</div>
			<div class="answer">
				<img
					draggable="false"
					src="https://icons.hackclub.com/api/icons/0xf8e9d3/expand"
					alt="flip"
				/>
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
		font-family: 'Jua';
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
		gap: 16px;
		background-color: #dd9f40;
		margin-top: 40px;
		position: relative;
		border-radius: 0 10px 10px 10px;
		color: #f8e9d3;
		box-shadow: var(--shadow);

		h1 {
			font-size: 1.25rem;
			position: absolute;
			top: -25px;
			left: 0;
			margin: 0;
			padding: 8px 24px;
			border-radius: 10px 10px 0 0;

			background-color: #dd9f40;
		}

		.spacer {
			height: 4px;
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
			box-shadow: var(--shadow);
		}

		input[type='checkbox'] {
			background-color: #f8e9d3;
			width: 48px;
			cursor: pointer;
			position: relative;
		}
		input[type='checkbox']::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			width: 24px;
			height: 24px;
			border: 2px solid #bf782b;
			border-radius: 8px;
		}
		input[type='checkbox']:checked::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			width: 24px;
			height: 24px;
			background-color: #bf782b;
			border-radius: 8px;
		}

		input[type='range']::-moz-range-track {
			background-color: #bf782b;
			height: 2px;
		}
		input[type='range']::-moz-range-thumb {
			background: #f8e9d3;
			border-radius: 50%;
			border: 2px solid #bf782b;
		}

		img {
			background-color: #bf782b;
			border-radius: 8px 0 0 8px;
			height: 48px;
			user-select: none;
			box-shadow: var(--shadow);
		}

		.subtitle {
			background-color: #e7bf6e;
			border-radius: 0 0 8px 8px;
			padding: 8px;
			color: #884b2b;
			font-size: 0.875rem;
		}
	}
</style>
