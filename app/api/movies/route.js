import { NextResponse } from "next/server";

const movies = [
    {
        id: "1",
        title: "Under Paris",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "To save Paris from a bloodbath, a grieving scientist is forced to face her tragic past when a giant shark appears in the Seine.",
        rating: 5.0,
        genre: "Action",
        actors: [
            { name: "Nassim Lyes", imageUrl: "/images/img-movie-actor.png" },
            { name: "Léa Lévi", imageUrl: "/images/img-movie-actor.png" },
            { name: "Anaïs Parello", imageUrl: "/images/img-movie-actor.png" },
            { name: "Ibrahima Ba", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "2",
        title: "Another Action Movie",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "This is a description for another action movie.",
        rating: 4.5,
        genre: "Action",
        actors: [
            { name: "John Doe", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "3",
        title: "The Great Escape",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "A classic war film about Allied prisoners of war who plan a mass escape from a German POW camp during World War II.",
        rating: 4.8,
        genre: "Drama",
        actors: [
            { name: "Steve McQueen", imageUrl: "/images/img-movie-actor.png" },
            { name: "James Garner", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "4",
        title: "Romantic Comedy",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "A heartwarming story of love and laughter.",
        rating: 4.0,
        genre: "Romance",
        actors: [
            { name: "Jane Doe", imageUrl: "/images/img-movie-actor.png" },
            { name: "Richard Roe", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "5",
        title: "Laugh Out Loud",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "A hilarious comedy that will make you burst into laughter.",
        rating: 4.2,
        genre: "Comedy",
        actors: [
            { name: "Chris Pratt", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "6",
        title: "Deep Emotional Drama",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "An intense and moving drama exploring human emotions.",
        rating: 4.7,
        genre: "Drama",
        actors: [
            { name: "Meryl Streep", imageUrl: "/images/img-movie-actor.png" },
            { name: "Tom Hanks", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "7",
        title: "Space Adventure",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "An epic journey through the stars.",
        rating: 4.9,
        genre: "Action",
        actors: [
            { name: "Hero One", imageUrl: "/images/img-movie-actor.png" },
            { name: "Heroine Two", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "8",
        title: "Heartfelt Romance",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "A beautiful love story that transcends time.",
        rating: 4.6,
        genre: "Romance",
        actors: [
            { name: "Romantic Lead", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
    {
        id: "9",
        title: "Slapstick Fun",
        imageUrl: "/images/img-movie.png",
        imageDetailUrl: "/images/img-movie-detail.png",
        description: "Pure comedic chaos from start to finish.",
        rating: 4.1,
        genre: "Comedy",
        actors: [
            { name: "Funny Guy", imageUrl: "/images/img-movie-actor.png" },
            { name: "Comedian Girl", imageUrl: "/images/img-movie-actor.png" },
        ],
        youtubeId: "v=jnCefPQIH98",
    },
];

export async function GET() {
	return NextResponse.json(movies);
}