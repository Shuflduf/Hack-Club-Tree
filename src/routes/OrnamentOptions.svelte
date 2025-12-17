<div class="background">
	<form>
		<div class="option">
			<h1>Transform</h1>
			<div class="answer">
				<h2>Rotation</h2>
				<input type="range" min="-180" max="180" step="10" />
			</div>
			<div class="answer">
				<h2>Flipped</h2>
				<input type="checkbox" />
			</div>
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
		width: min(600px, 80%);
		height: 100px;

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
</style>
