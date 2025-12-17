export type Ornament = {
	slack_id: string;
	username: string;
	pfp_url: string;
	ornament_position: [number, number];
	likes: number;
	updated_at: Date;
	created_at: Date;
};

enum Decoration {
	None,
	Glow,
	Lights,
	Antlers,
	Hearts
}

export type OrnamentConfig = {
	rotation_degress: number;
	flipped: boolean;
	decoration: Decoration;
};
