export type Ornament = {
	slack_id: string;
	username: string;
	pfp_url: string;
	ornament_position: [number, number];
	likes: number;
	updated_at: Date;
	created_at: Date;
	decoration_index: number;
	rotation: number;
	flipped: boolean;
};

export enum Decoration {
	None,
	Neon,
	Hearts,
	Snowman,
	Jolly,
	Lights,
	Gift
}

export const DecorationFiles: Record<Decoration, string> = {
	'0': '',
	'1': 'overlays/01_neon.png',
	'2': 'overlays/02_hearts.png',
	'3': 'overlays/03_snowman.png',
	'4': 'overlays/04_jolly.png',
	'5': 'overlays/05_lights.png',
	'6': 'overlays/06_gift.png'
};

export type OrnamentConfig = {
	rotation_degress: number;
	flipped: boolean;
	decoration: Decoration;
};
