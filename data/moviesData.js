const movies = [
	{
		id: "under-paris", // URL의 [detail]에 매핑될 값
		title: "Under Paris",
		imageUrl: "/images/img-movie.png",
		imageDetailUrl: "/images/img-movie-detail.png",
		description: "To save Paris from a bloodbath, a grieving scientist is forced to face her tragic past when a giant shark appears in the Seine.",
		rating: 5.0,
		actors: [
			{ name: "Nassim Lyes", imageUrl: "/images/img-movie-actor.png" },
			{ name: "Léa Lévi", imageUrl: "/images/img-movie-actor.png" },
			{ name: "Anaïs Parello", imageUrl: "/images/img-movie-actor.png" },
			{ name: "Ibrahima Ba", imageUrl: "/images/img-movie-actor.png" },
		],
	},
	{
		id: "another-movie",
		title: "Another Movie",
		imageUrl: "/images/img-movie.png",
		imageDetailUrl: "/images/img-movie-detail.png",
		description: "This is a description for another movie.",
		rating: 4.5,
		actors: [
			{ name: "John Doe", imageUrl: "/images/img-movie-actor.png" },
		],
	},
	{
		id: "the-great-escape",
		title: "The Great Escape",
		imageUrl: "/images/img-movie.png",
		imageDetailUrl: "/images/img-movie-detail.png",
		description: "A classic war film about Allied prisoners of war who plan a mass escape from a German POW camp during World War II.",
		rating: 4.8,
		actors: [
			{ name: "Steve McQueen", imageUrl: "/images/img-movie-actor.png" },
			{ name: "James Garner", imageUrl: "/images/img-movie-actor.g" },
		],
	},
];

export default movies;