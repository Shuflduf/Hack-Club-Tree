<div class="background">
	<form>
		<div class="question yellow">
			<h1>Transform</h1>
			<div class="spacer"></div>
			<div class="answer">
				<img
					draggable="false"
					src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-reload"
					alt="rotation"
				/>
				<input type="range" min="-180" max="180" step="20" />
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

		<div class="question red">
			<h1>Decoration</h1>
			<div class="spacer"></div>
			<div class="answer">
				<img
					draggable="false"
					src="https://icons.hackclub.com/api/icons/0xf8e9d3/view-reload"
					alt="rotation"
				/>
				<input type="range" min="-180" max="180" step="20" />
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
	.yellow {
		--bg: #dd9f40;
		--text: #f8e9d3;
		--accent: #bf782b;
		--subtitle-text: #884b2b;
		--subtitle-bg: #e7bf6e;
	}
	.red {
		--bg: #be4b53;
		--text: #f8e9d3;
		--accent: #a3383f;
		--subtitle-bg: #f9b19f;
		--subtitle-text: #592c26;
	}
	.background {
		width: 100dvw;
		height: 100dvh;
		position: fixed;
		display: flex;
		justify-content: center;
		align-items: center;
		backdrop-filter: blur(2px);
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
		background-color: var(--bg);
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

			background-color: var(--bg);
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
			background-color: var(--text);
			appearance: none;
			border-radius: 0 8px 8px 0;
			cursor: pointer;
			box-shadow: var(--shadow);
			position: relative;
		}

		input[type='checkbox'] {
			background-color: var(--text);
			width: 48px;
			cursor: pointer;
		}
		input[type='checkbox']::before {
			content: '';
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

			width: 24px;
			height: 24px;
			border: 2px solid var(--accent);
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
			background-color: var(--accent);
			border-radius: 8px;
		}

		input[type='range']::-moz-range-track {
			background-color: var(--accent);
			height: 2px;
		}
		input[type='range']::-moz-range-thumb {
			background: var(--text);
			border-radius: 50%;
			border: 2px solid var(--accent);
		}

		img {
			background-color: var(--accent);
			border-radius: 8px 0 0 8px;
			height: 48px;
			width: 48px;
			user-select: none;
			box-shadow: var(--shadow);
		}

		.subtitle {
			background-color: var(--subtitle-bg);
			border-radius: 0 0 8px 8px;
			padding: 8px;
			color: var(--subtitle-text);
			font-size: 0.875rem;
		}
	}
</style>
