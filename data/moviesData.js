const movies = [
	{
		id: "under-paris", // URL의 [detail]에 매핑될 값
		title: "Under Paris",
		imageUrl: "/images/img-movie1.png",
		imageDetailUrl: "/images/img-movie-detail1.png",
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
		imageUrl: "/images/img-movie2.png",
		imageDetailUrl: "/images/img-movie-detail2.png",
		description: "This is a description for another movie.",
		rating: 4.5,
		actors: [
			{ name: "John Doe", imageUrl: "/images/img-movie-actor.png" },
		],
	}
];

export default movies;